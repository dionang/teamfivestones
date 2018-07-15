/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package scube.entities;

import java.sql.Date;

/**
 *
 * @author Dion
 */
public class Template {
    private int templateId;    
    private int companyId;
    private String templateName;
    private int createdBy;
    private Date createdOn;
    private Date lastUpdatedOn;
    
    public Template(int templateId, int companyId, String templateName, int createdBy, Date createdOn, Date lastUpdatedOn) {
        this.templateId = templateId;        
        this.companyId = companyId;
        this.templateName = templateName;
        this.createdBy = createdBy;
        this.createdOn = createdOn;
        this.lastUpdatedOn = lastUpdatedOn;
    }
    
    
    public int getTemplateId() {
        return templateId;
    }
    
    public int getCompanyId() {
        return companyId;
    }
    
    public void setCompanyId(int companyId) {
        this.companyId = companyId;
    }

    public String getTemplateName() {
        return templateName;
    }

    public void setTemplateName(String templateName) {
        this.templateName = templateName;
    }

    public int getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(int createdBy) {
        this.createdBy = createdBy;
    }

    public Date getCreatedOn() {
        return createdOn;
    }

    public Date getLastUpdatedOn() {
        return lastUpdatedOn;
    }

    public void setLastUpdatedOn(Date lastUpdatedOn) {
        this.lastUpdatedOn = lastUpdatedOn;
    }
}
