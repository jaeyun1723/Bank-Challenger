package com.boolsazo.bankchall;

import com.boolsazo.bankchall.domain.TestObject;
import com.boolsazo.bankchall.test.TestUtil;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.junit.Test;

public class MyBatisFrameworkUnitTest {

    @Test
    public void unit() throws Exception {
        // 1. SqlSessionFactory -- SqlSessionFactoryBean
        SqlSessionFactory factory = TestUtil.getSqlSessionFactory();

        // 2. SqlSession -- SqlSessionTemplate
        SqlSession session = factory.openSession();

        //4. getMember
        System.out.println("========= 4. getMember  ============");
        TestObject vo = session.selectOne("test.getTest", "111");
        System.out.println(vo.getWord());


    }
}