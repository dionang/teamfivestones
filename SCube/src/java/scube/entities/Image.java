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
public class Image extends Component {
    public String imagePrefix;        
    public byte[] imageData;    

    public Image(String type, int x, int y, int height, int width, String imagePrefix, byte[] imageData) {
        super(type, x, y, height, width);
        this.imagePrefix = imagePrefix;
        this.imageData = imageData;
    }

    public String getImagePrefix() {
        return imagePrefix;
    }

    public void setImagePrefix(String imagePrefix) {
        this.imagePrefix = imagePrefix;
    }

    public byte[] getImageData() {
        return imageData;
    }

    public void setImageData(byte[] imageData) {
        this.imageData = imageData;
    }
}
