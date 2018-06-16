package entities;

public class Developer extends Account {
	public Developer(int accountId, int companyId, String accountType, String name) {
		super(accountId, companyId, accountType, name);
		
	}

	public boolean setDatasource(String datasourceUrl, int companyId) {
		return false;
	}
}
