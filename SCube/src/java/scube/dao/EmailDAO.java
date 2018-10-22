/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package scube.dao;

import java.io.File;
import java.util.*;
import javax.activation.*;
import javax.mail.*;
import javax.mail.internet.*;

/**
 *
 * @author ZhenDan
 */
public class EmailDAO {

    public static void sendPassowrd(String username, String subject, String message) {
        String receiver = username;
        //Setting up configurations for the email connection to the Google SMTP server using TLS
        Properties props = new Properties();
        props.put("mail.smtp.host", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");
        props.put("mail.smtp.auth", "true");
        //Establishing a session with required user details
        Session session = Session.getInstance(props, new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication("scube.noreply@gmail.com", "Zd123456");
            }
        });
        try {
            //Creating a Message object to set the email content
            MimeMessage msg = new MimeMessage(session);
            /*Parsing the String with defualt delimiter as a comma by marking the boolean as true and storing the email
            addresses in an array of InternetAddress objects*/
            InternetAddress[] address = InternetAddress.parse(receiver, true);
            //Setting the recepients from the address variable
            msg.setRecipients(Message.RecipientType.TO, address);
            msg.setSubject(subject);
            msg.setSentDate(new Date());
            msg.setText(message);
            msg.setHeader("XPriority", "1");
            Transport.send(msg);
            System.out.println("Mail has been sent successfully to " + receiver);
        } catch (MessagingException mex) {
            System.out.println("Unable to send an email " + mex);
            throw new RuntimeException("Error with email");
        }

    }

    public static boolean sendEmail(String from, String pw, String to, String s, String m,ArrayList<String>filePath) {
        final String sender = from;
        final String password = pw;
        String receiver = to;
        String subject = s;
        String message = m;
        ArrayList<String> path=filePath;
        boolean result=false;

        //Setting up configurations for the email connection to the Google SMTP server using TLS
        Properties props = new Properties();
        props.put("mail.smtp.host", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");
        props.put("mail.smtp.auth", "true");
        //Establishing a session with required user details
        Session session = Session.getInstance(props, new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(sender, password);
            }
        });
        try {
            //Creating a Message object to set the email content
            MimeMessage msg = new MimeMessage(session);
            /*Parsing the String with defualt delimiter as a comma by marking the boolean as true and storing the email
            addresses in an array of InternetAddress objects*/
            InternetAddress[] address = InternetAddress.parse(receiver, true);
            //Setting the recepients from the address variable
            msg.setRecipients(Message.RecipientType.TO, address);
            msg.setSubject(subject);
            // Create the message part
            BodyPart messageBodyPart = new MimeBodyPart();

            // Now set the actual message
            messageBodyPart.setText(message);

            // Create a multipar message
            Multipart multipart = new MimeMultipart();

            // Set text message part
            multipart.addBodyPart(messageBodyPart);
            // Part two is attachment
            messageBodyPart = new MimeBodyPart();
            for(String p:path){
                addAttachment(multipart, p);
            }
            
           
            
            //msg.setSentDate(multipart);
            //msg.setText(message);
            msg.setContent(multipart);
            //msg.setHeader("XPriority", "1");
            Transport.send(msg);
           
            result=true;
            return result;
        } catch (MessagingException mex) {
            result=false;
            System.out.println("Unable to send an email " + mex);
            throw new RuntimeException("Error with email");
            
        }finally{
            return result;
        }

    }

    private static void addAttachment(Multipart multipart, String filename) throws MessagingException {
        DataSource source = new FileDataSource(filename);
        BodyPart messageBodyPart = new MimeBodyPart();
        messageBodyPart.setDataHandler(new DataHandler(source));
        int length=filename.length();
        int lastSlash=filename.lastIndexOf( '\\' );
        messageBodyPart.setFileName(filename.substring(lastSlash+1, length));
        multipart.addBodyPart(messageBodyPart);
    }
}
