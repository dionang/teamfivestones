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
public class Textbox extends Component {
    private String text;

    public Textbox(String type, int x, int y, int height, int width, String text) {
        super(type, x, y, height, width);
        this.text = text;
    }
    
    /**
     * @return the text
     */
    public String getText() {
        return text;
    }

    /**
     * @param text the text to set
     */
    public void setText(String text) {
        this.text = text;
    }
}
