package com.boolsazo.bankchall.test;

import java.io.IOException;
import java.io.Reader;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;


public class TestUtil {

    public static SqlSessionFactory getSqlSessionFactory() throws IOException {
        Reader reader = Resources.getResourceAsReader("config/SqlMapConfig.xml");

        SqlSessionFactory factory = new SqlSessionFactoryBuilder().build(reader);
        return factory;
    }
}