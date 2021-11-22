--
-- PostgreSQL database dump
--

-- Dumped from database version 12.9 (Ubuntu 12.9-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.9 (Ubuntu 12.9-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: adress; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.adress (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.adress OWNER TO postgres;

--
-- Name: adress_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.adress_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.adress_id_seq OWNER TO postgres;

--
-- Name: adress_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.adress_id_seq OWNED BY public.adress.id;


--
-- Name: aux; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.aux (
    id integer NOT NULL,
    user_id integer NOT NULL,
    plan_id integer NOT NULL,
    product_id integer NOT NULL,
    date character varying(255) NOT NULL,
    subscription_date date NOT NULL
);


ALTER TABLE public.aux OWNER TO postgres;

--
-- Name: aux_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.aux_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.aux_id_seq OWNER TO postgres;

--
-- Name: aux_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.aux_id_seq OWNED BY public.aux.id;


--
-- Name: logged_users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.logged_users (
    id integer NOT NULL,
    user_id integer NOT NULL,
    token character varying(255) NOT NULL
);


ALTER TABLE public.logged_users OWNER TO postgres;

--
-- Name: logged_users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.logged_users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.logged_users_id_seq OWNER TO postgres;

--
-- Name: logged_users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.logged_users_id_seq OWNED BY public.logged_users.id;


--
-- Name: plans; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.plans (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.plans OWNER TO postgres;

--
-- Name: plans_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.plans_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.plans_id_seq OWNER TO postgres;

--
-- Name: plans_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.plans_id_seq OWNED BY public.plans.id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.products OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.products_id_seq OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    email character varying(255) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: adress id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.adress ALTER COLUMN id SET DEFAULT nextval('public.adress_id_seq'::regclass);


--
-- Name: aux id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.aux ALTER COLUMN id SET DEFAULT nextval('public.aux_id_seq'::regclass);


--
-- Name: logged_users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.logged_users ALTER COLUMN id SET DEFAULT nextval('public.logged_users_id_seq'::regclass);


--
-- Name: plans id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plans ALTER COLUMN id SET DEFAULT nextval('public.plans_id_seq'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: adress; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.adress (id, name, user_id) FROM stdin;
\.


--
-- Data for Name: aux; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.aux (id, user_id, plan_id, product_id, date, subscription_date) FROM stdin;
\.


--
-- Data for Name: logged_users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.logged_users (id, user_id, token) FROM stdin;
\.


--
-- Data for Name: plans; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.plans (id, name) FROM stdin;
1	Mensal
2	Semanal
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, name) FROM stdin;
1	Chás
2	Incensos
3	Produtos orgânicos
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, password, email) FROM stdin;
\.


--
-- Name: adress_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.adress_id_seq', 1, false);


--
-- Name: aux_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.aux_id_seq', 1, false);


--
-- Name: logged_users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.logged_users_id_seq', 1, false);


--
-- Name: plans_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.plans_id_seq', 2, true);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 3, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- Name: adress adress_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.adress
    ADD CONSTRAINT adress_pk PRIMARY KEY (id);


--
-- Name: aux aux_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.aux
    ADD CONSTRAINT aux_pk PRIMARY KEY (id);


--
-- Name: logged_users logged_users_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.logged_users
    ADD CONSTRAINT logged_users_pk PRIMARY KEY (id);


--
-- Name: logged_users logged_users_token_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.logged_users
    ADD CONSTRAINT logged_users_token_key UNIQUE (token);


--
-- Name: plans plans_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plans
    ADD CONSTRAINT plans_name_key UNIQUE (name);


--
-- Name: plans plans_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plans
    ADD CONSTRAINT plans_pk PRIMARY KEY (id);


--
-- Name: products products_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_name_key UNIQUE (name);


--
-- Name: products products_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pk PRIMARY KEY (id);


--
-- Name: users users_password_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_password_key UNIQUE (password);


--
-- Name: users users_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY (id);


--
-- Name: adress adress_fk0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.adress
    ADD CONSTRAINT adress_fk0 FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: aux aux_fk0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.aux
    ADD CONSTRAINT aux_fk0 FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: aux aux_fk1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.aux
    ADD CONSTRAINT aux_fk1 FOREIGN KEY (plan_id) REFERENCES public.plans(id);


--
-- Name: aux aux_fk2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.aux
    ADD CONSTRAINT aux_fk2 FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- Name: logged_users logged_users_fk0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.logged_users
    ADD CONSTRAINT logged_users_fk0 FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

