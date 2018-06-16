package action;

import models.AccountDAO;

public class LoginAction {

	private String username;
	private String password;  
	  
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

	public String execute() throws Exception{  
		System.out.println(password);
		System.out.println(AccountDAO.authenticate(username, password));
		if(AccountDAO.authenticate(username, password)){  
		    return "success";  
		}  
		else{  
		    return "error";  
		}  
	}  
}  