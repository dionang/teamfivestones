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
    private int datasetId;
    private String fieldName;
    private String type;
    private String infoType;
    
    public List(int datasetId, String fieldName, String type, String infoType){
        this.datasetId=datasetId;
        this.fieldName=fieldName;
        this.type=type;
        this.infoType=infoType;
    }
    public int getDatasetId(){
        return datasetId;
    }
    public void setDatasetId(int datasetId){
        this.datasetId=datasetId;
    }
    public String fieldName(){
        return fieldName;
    }
    public void setFieldName(String fieldName){
        this.fieldName=fieldName;
    }
    public String type(){
        return type;
    }
    public void setType(String type){
        this.type=type;
    }
    public String infoType(){
        return infoType;
    }
    public void setInfoType(String infoType){
        this.infoType=infoType;
    }
    
    
}
