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
    private String createdBy;
    private Date createdOn;
    private Date lastUpdatedOn;
    private String size;
    private String layout;
    
    public Template(int templateId, int companyId, String templateName, String createdBy, Date createdOn, Date lastUpdatedOn,String size,String layout) {
        this.templateId = templateId;        
        this.companyId = companyId;
        this.templateName = templateName;
        this.createdBy = createdBy;
        this.createdOn = createdOn;
        this.lastUpdatedOn = lastUpdatedOn;
        this.size=size;
        this.layout=layout;
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

    public String getCreatedBy() {
        return createdBy;
    }
    public String getSize() {
        return createdBy;
    }
    public String getLayout() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }
     public void setSize(String size) {
        this.size =size;
    }
      public void setLayout(String layout) {
        this.layout = layout;
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
