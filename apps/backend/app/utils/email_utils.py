import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Optional
import logging

from app.core.config import settings

logger = logging.getLogger(__name__)

async def send_password_reset_email(email: str, reset_token: str) -> None:
    """Send password reset email to user"""
    try:
        # Create message
        message = MIMEMultipart()
        message["From"] = settings.SMTP_FROM_EMAIL
        message["To"] = email
        message["Subject"] = "Password Reset Request"
        
        # Email body
        body = f"""
        Hello,
        
        We received a request to reset your password. Click the link below to reset it:
        
        {settings.FRONTEND_URL}/reset-password?token={reset_token}
        
        If you didn't request this, please ignore this email.
        
        Best regards,
        DeepRubric Team
        """
        
        message.attach(MIMEText(body, "plain"))
        
        # Send email
        with smtplib.SMTP(settings.SMTP_SERVER, settings.SMTP_PORT) as server:
            server.starttls()
            server.login(settings.SMTP_USERNAME, settings.SMTP_PASSWORD)
            server.send_message(message)
        
        logger.info(f"Password reset email sent to {email}")
        
    except Exception as e:
        logger.error(f"Failed to send password reset email to {email}: {e}")
        # Don't raise exception to avoid revealing if email exists

async def send_welcome_email(email: str, full_name: str) -> None:
    """Send welcome email to new user"""
    try:
        message = MIMEMultipart()
        message["From"] = settings.SMTP_FROM_EMAIL
        message["To"] = email
        message["Subject"] = "Welcome to DeepRubric!"
        
        body = f"""
        Welcome {full_name}!
        
        Your DeepRubric account has been created successfully.
        
        You can now:
        - Access your dashboard
        - View your courses and assignments
        - Submit assignments and view grades
        
        If you need any help, please contact our support team.
        
        Best regards,
        DeepRubric Team
        """
        
        message.attach(MIMEText(body, "plain"))
        
        with smtplib.SMTP(settings.SMTP_SERVER, settings.SMTP_PORT) as server:
            server.starttls()
            server.login(settings.SMTP_USERNAME, settings.SMTP_PASSWORD)
            server.send_message(message)
        
        logger.info(f"Welcome email sent to {email}")
        
    except Exception as e:
        logger.error(f"Failed to send welcome email to {email}: {e}")

async def send_grade_notification_email(email: str, assignment_name: str, grade: str, course_name: str) -> None:
    """Send grade notification email to student"""
    try:
        message = MIMEMultipart()
        message["From"] = settings.SMTP_FROM_EMAIL
        message["To"] = email
        message["Subject"] = f"New Grade Available: {assignment_name}"
        
        body = f"""
        Hello,
        
        Your grade for {assignment_name} in {course_name} has been posted.
        
        Grade: {grade}
        
        You can view your detailed feedback in your dashboard.
        
        Best regards,
        DeepRubric Team
        """
        
        message.attach(MIMEText(body, "plain"))
        
        with smtplib.SMTP(settings.SMTP_SERVER, settings.SMTP_PORT) as server:
            server.starttls()
            server.login(settings.SMTP_USERNAME, settings.SMTP_PASSWORD)
            server.send_message(message)
        
        logger.info(f"Grade notification email sent to {email} for {assignment_name}")
        
    except Exception as e:
        logger.error(f"Failed to send grade notification email to {email}: {e}")

async def send_assignment_reminder_email(email: str, assignment_name: str, due_date: str, course_name: str) -> None:
    """Send assignment reminder email to student"""
    try:
        message = MIMEMultipart()
        message["From"] = settings.SMTP_FROM_EMAIL
        message["To"] = email
        message["Subject"] = f"Assignment Reminder: {assignment_name}"
        
        body = f"""
        Hello,
        
        This is a reminder that {assignment_name} in {course_name} is due on {due_date}.
        
        Please submit your assignment before the deadline to avoid late penalties.
        
        Best regards,
        DeepRubric Team
        """
        
        message.attach(MIMEText(body, "plain"))
        
        with smtplib.SMTP(settings.SMTP_SERVER, settings.SMTP_PORT) as server:
            server.starttls()
            server.login(settings.SMTP_USERNAME, settings.SMTP_PASSWORD)
            server.send_message(message)
        
        logger.info(f"Assignment reminder email sent to {email} for {assignment_name}")
        
    except Exception as e:
        logger.error(f"Failed to send assignment reminder email to {email}: {e}")