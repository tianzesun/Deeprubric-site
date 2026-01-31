/**
 * 考试管理功能类型定义
 */

// 考试基本信息
export interface Exam {
  id: string;
  title: string;
  description: string;
  course_id: string;
  course_name: string;
  total_points: number;
  duration_minutes: number;
  start_time: string;
  end_time: string;
  is_published: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  created_by: string;
  questions_count: number;
  submissions_count: number;
  average_score?: number;
  highest_score?: number;
  lowest_score?: number;
}

// 考试问题类型
export interface ExamQuestion {
  id: string;
  exam_id: string;
  question_text: string;
  question_type: 'multiple_choice' | 'short_answer' | 'essay' | 'true_false' | 'matching';
  points: number;
  order: number;
  options?: QuestionOption[];
  correct_answer?: string;
  answer_key?: string;
  explanation?: string;
  created_at: string;
  updated_at: string;
}

// 问题选项（用于选择题）
export interface QuestionOption {
  id: string;
  question_id: string;
  option_text: string;
  is_correct: boolean;
  order: number;
}

// 考试提交
export interface ExamSubmission {
  id: string;
  exam_id: string;
  student_id: string;
  student_name: string;
  student_email: string;
  submitted_at: string;
  completed_at?: string;
  total_score: number;
  max_score: number;
  percentage: number;
  answers: ExamAnswer[];
  is_completed: boolean;
  time_spent_seconds: number;
  ip_address?: string;
  browser_info?: string;
}

// 考试答案
export interface ExamAnswer {
  id: string;
  submission_id: string;
  question_id: string;
  question_text: string;
  question_type: string;
  answer_text?: string;
  selected_options?: string[];
  score: number;
  max_score: number;
  feedback?: string;
  is_correct?: boolean;
  created_at: string;
  updated_at: string;
}

// 考试分析数据
export interface ExamAnalytics {
  exam_id: string;
  total_students: number;
  completed_students: number;
  completion_rate: number;
  average_score: number;
  median_score: number;
  highest_score: number;
  lowest_score: number;
  standard_deviation: number;
  question_stats: QuestionAnalytics[];
  score_distribution: ScoreDistribution[];
  time_stats: TimeStatistics;
  submission_timeline: SubmissionTimeline[];
}

// 问题分析
export interface QuestionAnalytics {
  question_id: string;
  question_text: string;
  question_type: string;
  average_score: number;
  correct_rate: number;
  difficulty_level: 'easy' | 'medium' | 'hard';
  discrimination_index: number;
  most_common_wrong_answer?: string;
  options_stats?: OptionAnalytics[];
}

// 选项分析
export interface OptionAnalytics {
  option_id: string;
  option_text: string;
  is_correct: boolean;
  selected_count: number;
  selected_percentage: number;
}

// 分数分布
export interface ScoreDistribution {
  score_range: string;
  count: number;
  percentage: number;
}

// 时间统计
export interface TimeStatistics {
  average_time: number;
  median_time: number;
  min_time: number;
  max_time: number;
  time_distribution: TimeDistribution[];
}

// 时间分布
export interface TimeDistribution {
  time_range: string;
  count: number;
  percentage: number;
}

// 提交时间线
export interface SubmissionTimeline {
  hour: number;
  submission_count: number;
  cumulative_percentage: number;
}

// 考试创建/更新请求
export interface CreateExamRequest {
  title: string;
  description: string;
  course_id: string;
  total_points: number;
  duration_minutes: number;
  start_time: string;
  end_time: string;
  questions: CreateQuestionRequest[];
}

export interface UpdateExamRequest {
  title?: string;
  description?: string;
  total_points?: number;
  duration_minutes?: number;
  start_time?: string;
  end_time?: string;
  is_published?: boolean;
}

export interface CreateQuestionRequest {
  question_text: string;
  question_type: 'multiple_choice' | 'short_answer' | 'essay' | 'true_false' | 'matching';
  points: number;
  order: number;
  options?: CreateOptionRequest[];
  correct_answer?: string;
  answer_key?: string;
  explanation?: string;
}

export interface CreateOptionRequest {
  option_text: string;
  is_correct: boolean;
  order: number;
}

// 考试提交请求
export interface SubmitExamRequest {
  exam_id: string;
  answers: SubmitAnswerRequest[];
}

export interface SubmitAnswerRequest {
  question_id: string;
  answer_text?: string;
  selected_options?: string[];
}

// 考试状态
export interface ExamStatus {
  exam_id: string;
  is_active: boolean;
  is_published: boolean;
  has_started: boolean;
  has_ended: boolean;
  time_remaining?: number; // 剩余秒数
  student_progress?: StudentProgress;
}

export interface StudentProgress {
  submission_id?: string;
  current_question_index: number;
  answered_count: number;
  total_questions: number;
  time_spent_seconds: number;
  estimated_completion_time?: number;
}

// 考试过滤和搜索
export interface ExamFilter {
  course_id?: string;
  status?: 'all' | 'active' | 'completed' | 'upcoming';
  date_range?: {
    start: string;
    end: string;
  };
  search?: string;
  sort_by?: 'created_at' | 'start_time' | 'title';
  sort_order?: 'asc' | 'desc';
  page?: number;
  page_size?: number;
}

// 考试报告
export interface ExamReport {
  exam_id: string;
  exam_title: string;
  course_name: string;
  report_date: string;
  summary: ExamSummary;
  detailed_results: DetailedResult[];
  recommendations: string[];
}

export interface ExamSummary {
  total_students: number;
  average_score: number;
  pass_rate: number;
  fail_rate: number;
  highest_score: number;
  lowest_score: number;
  median_score: number;
  standard_deviation: number;
}

export interface DetailedResult {
  student_id: string;
  student_name: string;
  student_email: string;
  score: number;
  percentage: number;
  grade: string;
  submission_time: string;
  completion_time?: string;
  time_spent: number;
  passed: boolean;
  question_details: QuestionDetail[];
}

export interface QuestionDetail {
  question_id: string;
  question_text: string;
  points: number;
  score: number;
  percentage: number;
  is_correct: boolean;
  student_answer?: string;
  correct_answer?: string;
  feedback?: string;
}

