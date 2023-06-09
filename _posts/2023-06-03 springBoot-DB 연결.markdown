---
layout: post
title:  "(230603) Springboot DB연결하기"
date:   2014-08-29 14:34:25
categories: jekyll update
tags: featured
image: /assets/article_images/2014-08-29-welcome-to-jekyll/desktop.JPG
---
#프로그래머스 - 마지막 두 원소 (정답입니다인줄 알았는데 틀렸습니다였음, 테스트케이스 딱 하나에서 걸린 상황, 해결해야됨)

class Solution {
    public int[] solution(int[] num_list) {
        int result=0;
        int[] newArr = new int[num_list.length+1];
        
        for(int i=0; i<newArr.length-1; i++){
            newArr[i] = num_list[i];
        }

        if(num_list[num_list.length-2] <= num_list[num_list.length-1]){
            result = num_list[num_list.length-1] - num_list[num_list.length-2];
            newArr[newArr.length-1] = result;
        }
        else if(num_list[num_list.length-2] > num_list[num_list.length-1])
        {
            result = (num_list[num_list.length - 1]) * 2;
            newArr[newArr.length-1] = result;
        }
        return newArr;
    }
}




DB 설정추가

DB 사용에 필요한 정보를 application.properties에 추가 ( resources/application.properties )



----- sqlite3 사용 시 해당 -----

```
driverClassName=org.sqlite.JDBC
#url=jdbc:sqlite:memory:test?cache=shared
url=jdbc:sqlite:test.db
username=sa 
password=sa
spring.jpa.database-platform=org.hibernate.community.dialect.SQLiteDialect 
hibernate.hbm2ddl.auto=update
hibernate.show_sql=true
```





----- mysql 사용 시 해당 -----
```
spring.datasource.url=jdbc:h2:tcp://localhost/~/test
spring.datasource.driver-class-name=org.h2.Driver
spring.datasource.username=sa

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```






resources/application.properties
- hibernate.ddl-auto은 서버와 DB 간의 데이터(테이블 형태 등) 동기화 방법에 대해 정의
 - 최초 테이블 생성을 위해 update를 사용하였지만, 운영 서버에서는 none 또는 validate를 이용하는것을 권장
- spring.jpa.show-sql은 자동으로 생성된 쿼리문 출력여부를 결정



DBConfig.java 파일 생성

package com.example.demo.config;

import java.util.Properties;
import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;

@Configuration
@EnableJpaRepositories(basePackages = "com.example.demo.repositories")
public class DBConfig {
    @Autowired
    private Environment env;

    @Bean
    public DataSource dataSource() {
        final DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName(env.getProperty("driverClassName"));
        dataSource.setUrl(env.getProperty("url"));
        dataSource.setUsername(env.getProperty("user"));
        dataSource.setPassword(env.getProperty("password"));
        return dataSource;
    }

    @Bean
    public LocalContainerEntityManagerFactoryBean entityManagerFactory() {
        final LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
        em.setDataSource(dataSource());
        em.setPackagesToScan(new String[] { "com.example.demo.models" });
        em.setJpaVendorAdapter(new HibernateJpaVendorAdapter());
        em.setJpaProperties(additionalProperties());
        return em;
    }

    final Properties additionalProperties() {
        final Properties hibernateProperties = new Properties();
        if (env.getProperty("hibernate.hbm2ddl.auto") != null) {
            hibernateProperties.setProperty("hibernate.hbm2ddl.auto", env.getProperty("hibernate.hbm2ddl.auto"));
        }
        if (env.getProperty("hibernate.dialect") != null) {
            hibernateProperties.setProperty("hibernate.dialect", env.getProperty("hibernate.dialect"));
        }
        if (env.getProperty("hibernate.show_sql") != null) {
            hibernateProperties.setProperty("hibernate.show_sql", env.getProperty("hibernate.show_sql"));
        }
        return hibernateProperties;
    }

}
후 기존에 있는 DemoApplication 실행 시 연결 성공


localhost:8080 접속 시 연결되었을 경우 아래 사진과 같은 화면




View 생성방법 ( 2가지 )
1. html을 이용하여 View 생성

front 만들기 : resource > static > index.html 파일 추가






2. DemoApplication에서 View 바로 작성

DemoApplication 에서 문구 삽입

@SpringBootApplication
@RestController
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	@GetMapping("/hello")
	public String hello(@RequestParam(value = "name", defaultValue = "world") String name){
		return "hellololololo" + name;
	}

}
+ defaultValue : 값이 없을 때 world 출력

+ @RestController :

+ @RequestParam :

+ @GetMapping : root directory

+ @Bean : 컴포넌트로 bean으로 등록 후 클래스 생성해놓으면 spring이 알아서 생성 및 호출 관리해준다. spring에 등록시킨다고 생각



Talend API Tester를 이용해 DB에 데이터 삽입 및 API 데이터 생성?

