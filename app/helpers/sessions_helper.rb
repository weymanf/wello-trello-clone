module SessionsHelper

  def require_login!
    redirect_to new_session_url unless current_user
  end
  
  def current_user
    @current_user ||= User.find_by_session_token(session[:session_token])
  end

end
