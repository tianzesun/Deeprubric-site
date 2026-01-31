#!/bin/bash

# ==============================
# DeepRubric Service Manager v2.1
# Fixes: Aggressive port cleaning & process tree termination
# ==============================

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

info() { echo -e "${BLUE}ℹ️  $1${NC}"; }
success() { echo -e "${GREEN}✅ $1${NC}"; }
warn() { echo -e "${YELLOW}⚠️  $1${NC}"; }
error() { echo -e "${RED}❌ $1${NC}"; }

# 路径配置
SCRIPT_PATH="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_PATH")"
FRONTEND_DIR="$PROJECT_ROOT/apps/frontend"
BACKEND_DIR="$PROJECT_ROOT/apps/backend"
LOG_DIR="$PROJECT_ROOT/log"
PID_FILE="$PROJECT_ROOT/.pids"

# 端口配置
FRONTEND_PORT=3000
BACKEND_PORT=8000

# 环境准备
mkdir -p "$LOG_DIR"
touch "$PID_FILE"
export NODE_OPTIONS="--max-old-space-size=4096"

# ==============================
# 核心工具函数
# ==============================

kill_port() {
    local port=$1
    
    # 方法1: 使用 fuser 强制杀掉占用端口的进程（需要 sudo）
    if command -v fuser >/dev/null 2>&1; then
        warn "使用 fuser 强制清理端口 $port"
        sudo fuser -k "$port/tcp" 2>/dev/null || true
        sleep 1
    fi
    
    # 方法2: 查找所有占用该端口的 PID（包括子进程）
    local pids=$(lsof -ti:"$port")
    
    if [ -n "$pids" ]; then
        warn "检测到端口 $port 被占用，强制清理进程: $pids"
        # 使用 -9 强制杀死，确保 Node.js 子进程无处遁形
        echo "$pids" | xargs kill -9 2>/dev/null || true
        # 给操作系统 1 秒钟释放 socket 句柄
        sleep 1
    fi
    
    # 方法3: 额外清理 Node.js 和 Next.js 相关进程
    warn "额外清理 Node.js 和 Next.js 进程"
    pkill -9 node 2>/dev/null || true
    pkill -9 next 2>/dev/null || true
    sleep 1
}

stop_all() {
    info "执行深度清理..."
    # 1. 先尝试杀掉 PID 文件记录的进程
    if [ -s "$PID_FILE" ]; then
        while read -r label pid; do
            kill -9 "$pid" 2>/dev/null || true
        done < "$PID_FILE"
        > "$PID_FILE"
    fi
    
    # 2. 物理清空端口（这是解决 3000 端口不死的关键）
    kill_port "$FRONTEND_PORT"
    kill_port "$BACKEND_PORT"
    
    success "所有占用 3000 和 8000 端口的进程已清除"
}

is_running() {
    [ -n "$1" ] && ps -p "$1" > /dev/null 2>&1
}

register_pid() {
    echo "$1 $2" >> "$PID_FILE"
}

# ==============================
# 服务控制逻辑
# ==============================

start_backend() {
    info "Starting Backend (FastAPI)..."
    kill_port "$BACKEND_PORT"
    cd "$BACKEND_DIR"
    
    # Use poetry to run uvicorn
    local cmd="poetry run uvicorn app.main:app --host 127.0.0.1 --port $BACKEND_PORT --reload"
    
    if [ "$DETACH" = true ]; then
        nohup $cmd > "$LOG_DIR/backend.log" 2>&1 &
        pid=$!
        register_pid "backend" "$pid"
        success "Backend backgrounded (PID: $pid)"
    else
        $cmd 2>&1 | tee "$LOG_DIR/backend.log" &
        pid=$!
        register_pid "backend" "$pid"
    fi
}

start_frontend() {
    info "Starting Frontend (Next.js)..."
    kill_port "$FRONTEND_PORT"
    cd "$FRONTEND_DIR"
    local cmd="pnpm dev"
   
    if [ "$DETACH" = true ]; then
        PORT=$FRONTEND_PORT NODE_OPTIONS="--max-old-space-size=4096" \
        nohup $cmd > "$LOG_DIR/frontend.log" 2>&1 &
        pid=$!
        register_pid "frontend" "$pid"
        success "Frontend started in background (PID: $pid)"
    else
        PORT=$FRONTEND_PORT NODE_OPTIONS="--max-old-space-size=4096" \
        $cmd 2>&1 | tee "$LOG_DIR/frontend.log" &
        pid=$!
        register_pid "frontend" "$pid"
    fi
}


# ==============================
# 命令行入口
# ==============================

DETACH=false
for arg in "$@"; do
    if [ "$arg" = "--detach" ]; then DETACH=true; fi
done

case "${1:-}" in
    start)
        stop_all
        start_backend
        start_frontend
        info "Run './service.sh tail' to view logs."
        ;;
    stop)
        stop_all
        ;;
    restart)
        stop_all
        sleep 1
        bash "$0" start "${@:2}"
        ;;
    status)
        echo -e "${BLUE}--- Status ---${NC}"
        f_pid=$(lsof -ti:"$FRONTEND_PORT")
        b_pid=$(lsof -ti:"$BACKEND_PORT")
        [ -n "$f_pid" ] && echo -e "Frontend: ${GREEN}RUNNING${NC} ($f_pid)" || echo -e "Frontend: ${RED}STOPPED${NC}"
        [ -n "$b_pid" ] && echo -e "Backend:  ${GREEN}RUNNING${NC} ($b_pid)" || echo -e "Backend:  ${RED}STOPPED${NC}"
        ;;
    tail)
        tail -F "$LOG_DIR/frontend.log" "$LOG_DIR/backend.log" 2>/dev/null | \
        awk -v F_LOG="$LOG_DIR/frontend.log" -v B_LOG="$LOG_DIR/backend.log" '
            {
                if (FILENAME == F_LOG) printf "\033[0;32m[FRONT]\033[0m %s\n", $0
                else if (FILENAME == B_LOG) printf "\033[0;34m[BACK ]\033[0m %s\n", $0
            }'
        ;;
    *)
        echo "Usage: $0 {start|stop|restart|status|tail} [--detach]"
        exit 1
        ;;
esac