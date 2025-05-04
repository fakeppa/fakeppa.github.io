package p1;

import javax.swing.*;
import java.awt.*;

public class Test1 {
    public static void main(String[] args) {
        JFrame f=new JFrame("JPanelDemo");
        f.setBounds(300,200,300,250);
        JPanel p = new JPanel();
        p.setBackground(Color.GREEN);

        JButton b1,b2,b3,b4;
        b1=new JButton("按钮1");
        b2=new JButton("按钮2");
        b3=new JButton("按钮3");
        b4=new JButton("按钮4");

        p.add(b1);
        p.add(b2);
        p.add(b3);
        p.add(b4);
        f.add(p);

        f.setVisible(true);
    }
}
