package com.ptit.timtro.config;

import com.ptit.timtro.security.AdvancedSecurityContextHolder;
import com.ptit.timtro.security.RestAuthenticationEntryPoint;
import com.ptit.timtro.security.SecurityUserDetailsService;
import com.ptit.timtro.security.TokenAuthenticationFilter;
import com.ptit.timtro.security.oauth2.HttpCookieOAuth2AuthorizationRequestRepository;
import com.ptit.timtro.security.oauth2.OAuth2AuthenticationFailureHandler;
import com.ptit.timtro.security.oauth2.OAuth2AuthenticationSuccessHandler;
import com.ptit.timtro.security.oauth2.Oauth2UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class ServerSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private SecurityUserDetailsService userDetailsService;

    @Autowired
    private Oauth2UserService oauth2UserService;

    @Autowired
    private OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHandler;

    @Autowired
    private OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;

    @Bean
    public PasswordEncoder userPasswordEncoder() {
        return new BCryptPasswordEncoder(8);
    }

    @Bean
    public TokenAuthenticationFilter tokenAuthenticationFilter() {
        return new TokenAuthenticationFilter();
    }

    @Bean
    public HttpCookieOAuth2AuthorizationRequestRepository cookieAuthorizationRequestRepository() {
        return new HttpCookieOAuth2AuthorizationRequestRepository();
    }

    @Bean(BeanIds.AUTHENTICATION_MANAGER)
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        AdvancedSecurityContextHolder.setAuthenticationManager(super.authenticationManagerBean());
        AdvancedSecurityContextHolder.setUserDetailsService(this.userDetailsService);
        return super.authenticationManagerBean();
    }

    @Autowired
    public void globalUserDetails(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService)
                .passwordEncoder(this.userPasswordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http.cors();
        http.formLogin().disable();
        http.httpBasic().disable();
        http.exceptionHandling().authenticationEntryPoint(new RestAuthenticationEntryPoint()); // thử xóa đi
        http.authorizeRequests()
                .antMatchers(
                        "/paypal/**",
                        "/swagger-ui.html", "/webjars/**", "/swagger-resources/**",
                        "/v2/api-docs/**", "/auth/login", "/auth/create-password", "/auth/register", "/auth/check-account-active",
                        "/oauth/**", "/oauth2/**", "/auth/gen-pass", "/auth/email-verify", "/auth/gen-code-email-verify", "/auth/get-account-forget",
                        "/address/**", "/post/get-all", "/post/get-by-id", "/post/get-by-user-id", "/category/get-all", "/tag/get-all",
                        "/image/**", "/comment/**", "/favorite/**", "/user/get-by-id", "/post-vip/get-all", "/payment/get-all-enable-post"
                ).permitAll()
                .antMatchers("/user/update", "/payment/get-by-user-id", "/post/remove", "/user/check-current-password").hasAnyRole("ADMIN", "MEMBER")
                .antMatchers("/tag/**", "/category/**", "/post-vip/**", "/user/get-all", "/user/delete", "/payment/get-all",
                        "/wallet/get-all","/wallet/update","/wallet/get-by-wallet-id").hasAnyRole("ADMIN")
                .anyRequest().authenticated(); // Tất cả các request khác đều cần phải xác thực mới được truy cập
        // Thêm một lớp Filter kiểm tra jwt
        http.oauth2Login()
                .authorizationEndpoint().baseUri("/oauth2/authorize")
                .authorizationRequestRepository(cookieAuthorizationRequestRepository())
                .and()
                .redirectionEndpoint().baseUri("/oauth2/callback/*")
                .and().userInfoEndpoint().userService(oauth2UserService)
                .and().successHandler(oAuth2AuthenticationSuccessHandler).failureHandler(oAuth2AuthenticationFailureHandler);
        // Add our custom Token based authentication filter
        http.addFilterBefore(tokenAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
    }
}
