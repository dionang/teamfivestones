package entities;

public class Account {
	private int accountId;
	private int companyId;
	private String accountType;
	private String name;
	
	public Account(int accountId, int companyId, String accountType, String name) {
		super();
		this.accountId = accountId;
		this.companyId = companyId;
		this.accountType = accountType;
		this.name = name;
	}
	
	public int getAccountId() {
		return accountId;
	}
	public void setAccountId(int accountId) {
		this.accountId = accountId;
	}
	public int getCompanyId() {
		return companyId;
	}
	public void setCompanyId(int companyId) {
		this.companyId = companyId;
	}
	public String getAccountType() {
		return accountType;
	}
	public void setAccountType(String accountType) {
		this.accountType = accountType;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
}
