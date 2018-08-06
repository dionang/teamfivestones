/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entities;

import java.sql.Date;

/**
 *
 * @author Dion
 */
public class CustomerOrder {
    public String customerName;    
    public int customerID;
    public Date purchaseDate;
    public double discount;
    public int age;
    public String gender;
    public int noOfGoodsBought;
    public int totalPayment;

    public CustomerOrder(String customerName, int customerID, Date purchaseDate, double discount, int age, String gender, int noOfGoodsBought, int totalPayment) {
        this.customerName = customerName;
        this.customerID = customerID;
        this.purchaseDate = purchaseDate;
        this.discount = discount;
        this.age = age;
        this.gender = gender;
        this.noOfGoodsBought = noOfGoodsBought;
        this.totalPayment = totalPayment;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public int getCustomerID() {
        return customerID;
    }

    public void setCustomerID(int customerID) {
        this.customerID = customerID;
    }

    public Date getPurchaseDate() {
        return purchaseDate;
    }

    public void setPurchaseDate(Date purchaseDate) {
        this.purchaseDate = purchaseDate;
    }

    public double getDiscount() {
        return discount;
    }

    public void setDiscount(double discount) {
        this.discount = discount;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public int getNoOfGoodsBought() {
        return noOfGoodsBought;
    }

    public void setNoOfGoodsBought(int noOfGoodsBought) {
        this.noOfGoodsBought = noOfGoodsBought;
    }

    public int getTotalPayment() {
        return totalPayment;
    }

    public void setTotalPayment(int totalPayment) {
        this.totalPayment = totalPayment;
    }
}
