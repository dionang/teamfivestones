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
    public String datasourceUrl;    
    public String dataset;
    public String title;
    public String xAxis;
    public String yAxis;
    public String aggregate;

    public Chart(String type, int x, int y, int height, int width, String datasourceUrl, String dataset, String title, String xAxis, String yAxis, String aggregate) {
        super(type, x, y, height, width);
        this.datasourceUrl = datasourceUrl;
        this.dataset = dataset;
        this.title = title;
        this.xAxis = xAxis;
        this.yAxis = yAxis;
        this.aggregate = aggregate;
    }
    
    public String getDatasourceUrl() {
        return datasourceUrl;
    }

    public void setDatasourceUrl(String datasourceUrl) {
        this.datasourceUrl = datasourceUrl;
    }

    public String getDataset() {
        return dataset;
    }

    public void setDataset(String dataset) {
        this.dataset = dataset;
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
}
