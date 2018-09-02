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
public class Dataset {
    private int datasetId;
    private String datasetName;
    private String path;
    private String type;
    private int datasourceId;
    
    public Dataset(int datasetId, String datasetName,String path,String type, int datasourceId){
        this.datasetId=datasetId;
        this.datasetName=datasetName;
        this.path=path;
        this.type=type;
        this.datasourceId=datasourceId;
    }
    public int getDtatasetId(){
        return datasetId;
    }
    public void setDatasetId(int datasetId){
        this.datasetId=datasetId;
    }
    public String getDtatasetName(){
        return datasetName;
    }
    public void setDatasetName(String datasetName){
        this.datasetName=datasetName;
    }
    public String getPath(){
        return path;
    }
    public void setPath(String path){
        this.path=path;
    }
    public String getType(){
        return type;
    }
    public void setType(String type){
        this.type=type;
    }
    public int getDatasourceId(){
        return datasourceId;
    }
    public void setDatasoureId(int datasourceId){
        this.datasourceId=datasourceId;
    }
}
