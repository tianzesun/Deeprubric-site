import sys
from logging.config import fileConfig
from sqlalchemy import engine_from_config, pool
from alembic import context

# 添加 backend app 到 Python 路径
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# 导入 ORM Base 和模型
from app.models.orm.base import Base
from app.models.orm import user, course, enrollment, rubric, rubric_criteria, score

# ===========================
# Alembic 配置
# ===========================
config = context.config

# ---------------------------
# 数据库 URL（直接写入 NeonDB PostgreSQL）
# ---------------------------
DATABASE_URL = (
    "postgresql://neondb_owner:npg_nOH95acgRvCw@"
    "ep-wild-darkness-ahlwqyqz-pooler.c-3.us-east-1.aws.neon.tech/"
    "neondb?sslmode=require&channel_binding=require"
)
config.set_main_option("sqlalchemy.url", DATABASE_URL)

# ---------------------------
# Logging 配置
# ---------------------------
if config.config_file_name is not None:
    try:
        fileConfig(config.config_file_name)
    except KeyError:
        # 如果 alembic.ini 没有 logging 配置，不报错
        pass

# ===========================
# Metadata
# ===========================
target_metadata = Base.metadata

# ===========================
# Offline migrations
# ===========================
def run_migrations_offline() -> None:
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )
    with context.begin_transaction():
        context.run_migrations()

# ===========================
# Online migrations
# ===========================
def run_migrations_online() -> None:
    connectable = engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )
    with connectable.connect() as connection:
        context.configure(connection=connection, target_metadata=target_metadata)
        with context.begin_transaction():
            context.run_migrations()

# ===========================
# Run
# ===========================
if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
