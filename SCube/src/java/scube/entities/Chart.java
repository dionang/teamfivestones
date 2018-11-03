/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package scube.entities;

/**
 *
 * @author Dion
 */
public class Chart extends Component{
    public int datasourceId;   
    public int datasetId;
    public String title;
    public String xAxis;
    public String yAxis;
    public String aggregate;
    public boolean summary;

    public Chart(String type, int x, int y, int height, int width, int datasourceId, int datasetId, String title, String xAxis, String yAxis, String aggregate, boolean summary) {
        super(type, x, y, height, width);
        this.datasourceId = datasourceId;
        this.datasetId = datasetId;
        this.title = title;
        this.xAxis = xAxis;
        this.yAxis = yAxis;
        this.aggregate = aggregate;
        this.summary = summary;
    }
    
    public int getDatasourceId() {
        return datasourceId;
    }

    public void setDatasourceId(int datasourceId) {
        this.datasourceId = datasourceId;
    }

    public int getDatasetId() {
        return datasetId;
    }

    public void setPath(int datasetId) {
        this.datasetId = datasetId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getXAxis() {
        return xAxis;
    }

    public void setXAxis(String xAxis) {
        this.xAxis = xAxis;
    }

    public String getYAxis() {
        return yAxis;
    }

    public void setYAxis(String yAxis) {
        this.yAxis = yAxis;
    }
    
    public String getAggregate() {
        return aggregate;
    }

    public void setAggregate(String aggregate) {
        this.aggregate = aggregate;
    }
    
    public boolean getSummary() {
        return summary;
    }

    public void setSummary(boolean summary) {
        this.summary = summary;
    }
}
