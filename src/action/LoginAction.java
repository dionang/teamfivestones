package action;

import org.apache.struts2.interceptor.SessionAware;
import com.opensymphony.xwork2.ActionSupport;

import entities.Account;
import entities.Developer;

import java.util.Map;
import models.AccountDAO;

public class LoginAction extends ActionSupport implements SessionAware {

	private String username;
	private String password;
	private Map<String, Object> session;
	
	@Override
	public void setSession(Map<String, Object> session) {
		this.session = session;
	}  
	  
	//getters and setters  
	  
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String execute() {  
		Account account = AccountDAO.login(username, password);
		
		if(account != null){
			session.put("account", account);
			if(account instanceof Developer) {
				return "developer"; 
			}
		    return "success";  
		} else {  
		    return "error";  
		}  
	}
}  