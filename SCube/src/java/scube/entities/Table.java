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
public class Table extends Component {
    public String columns;        
    public String data;    

    public Table(String type, int x, int y, int height, int width, String columns, String data) {
        super(type, x, y, height, width);
        this.columns = columns;
        this.data = data;
    }

    public String getColumns() {
        return columns;
    }

    public void setColumns(String columns) {
        this.columns = columns;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }
}
