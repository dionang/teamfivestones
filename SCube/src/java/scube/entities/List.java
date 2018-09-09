/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package scube.entities;

/**
 *
 * @author ZhenDan
 */
public class List {
    private int listId;
    private int datasetId;
    private String fieldName;
    private String type;
    private String infoType;
    
    public List(int listId, String fieldName, String type, String infoType,int datasetId){
        this.listId=listId;
        this.fieldName=fieldName;
        this.type=type;
        this.infoType=infoType;
        this.datasetId=datasetId;
    }
    public int getListId(){
        return listId;
    }
    public void setListId(){
        this.listId=listId;
    }
    public int getDatasetId(){
        return datasetId;
    }
    public void setDatasetId(int datasetId){
        this.datasetId=datasetId;
    }
    public String getfFieldName(){
        return fieldName;
    }
    public void setFieldName(String fieldName){
        this.fieldName=fieldName;
    }
    public String getType(){
        return type;
    }
    public void setType(String type){
        this.type=type;
    }
    public String getInfoType(){
        return infoType;
    }
    public void setInfoType(String infoType){
        this.infoType=infoType;
    }
    
    
}
