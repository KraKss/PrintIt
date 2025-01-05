--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2 (Debian 17.2-1.pgdg120+1)
-- Dumped by pg_dump version 17.2 (Debian 17.2-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public.review DROP CONSTRAINT IF EXISTS review_seller_id_fkey;
ALTER TABLE IF EXISTS ONLY public.review DROP CONSTRAINT IF EXISTS review_reviewer_id_fkey;
ALTER TABLE IF EXISTS ONLY public.product DROP CONSTRAINT IF EXISTS product_seller_id_fkey;
ALTER TABLE IF EXISTS ONLY public.orders DROP CONSTRAINT IF EXISTS orders_buyer_id_fkey;
ALTER TABLE IF EXISTS ONLY public.order_items DROP CONSTRAINT IF EXISTS order_items_product_id_fkey;
ALTER TABLE IF EXISTS ONLY public.order_items DROP CONSTRAINT IF EXISTS order_items_order_id_fkey;
ALTER TABLE IF EXISTS ONLY public.review DROP CONSTRAINT IF EXISTS review_pkey;
ALTER TABLE IF EXISTS ONLY public.profile DROP CONSTRAINT IF EXISTS profile_pkey;
ALTER TABLE IF EXISTS ONLY public.profile DROP CONSTRAINT IF EXISTS profile_email_key;
ALTER TABLE IF EXISTS ONLY public.product DROP CONSTRAINT IF EXISTS product_pkey;
ALTER TABLE IF EXISTS ONLY public.orders DROP CONSTRAINT IF EXISTS orders_pkey;
ALTER TABLE IF EXISTS ONLY public.order_items DROP CONSTRAINT IF EXISTS order_items_pkey;
ALTER TABLE IF EXISTS ONLY public.manager DROP CONSTRAINT IF EXISTS manager_pkey;
ALTER TABLE IF EXISTS ONLY public.manager DROP CONSTRAINT IF EXISTS manager_email_key;
DROP TABLE IF EXISTS public.review;
DROP TABLE IF EXISTS public.profile;
DROP TABLE IF EXISTS public.product;
DROP TABLE IF EXISTS public.orders;
DROP TABLE IF EXISTS public.order_items;
DROP TABLE IF EXISTS public.manager;
DROP TYPE IF EXISTS public.shipping_status;
DROP TYPE IF EXISTS public.payment_status;
--
-- Name: payment_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.payment_status AS ENUM (
    'pending',
    'completed',
    'failed'
);


--
-- Name: shipping_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.shipping_status AS ENUM (
    'not_shipped',
    'shipped',
    'delivered'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: manager; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.manager (
    id integer NOT NULL,
    name character varying,
    email character varying,
    password character varying
);


--
-- Name: manager_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.manager ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.manager_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: order_items; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.order_items (
    order_id integer NOT NULL,
    product_id integer NOT NULL,
    quantity integer NOT NULL
);


--
-- Name: orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    buyer_id integer NOT NULL,
    payment_status public.payment_status DEFAULT 'pending'::public.payment_status,
    shipping_status public.shipping_status DEFAULT 'not_shipped'::public.shipping_status,
    order_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: orders_order_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.orders ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.orders_order_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: product; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.product (
    id integer NOT NULL,
    seller_id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    price numeric(10,2) NOT NULL,
    filament_type integer
);


--
-- Name: product_product_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.product ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.product_product_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: profile; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.profile (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    address text,
    bank_account character varying(255),
    balance numeric(10,2) DEFAULT 0.00,
    image character varying(255)
);


--
-- Name: profile_user_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.profile ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.profile_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: review; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.review (
    reviewer_id integer NOT NULL,
    seller_id integer NOT NULL,
    rating integer DEFAULT 0 NOT NULL,
    comment text,
    review_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT review_rating_check CHECK (((rating >= 0) AND (rating <= 5)))
);


--
-- Data for Name: manager; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.manager OVERRIDING SYSTEM VALUE VALUES (1, 'John', 'john@mail.com', 'password');


--
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.order_items VALUES (1, 1, 2);
INSERT INTO public.order_items VALUES (3, 3, 3);
INSERT INTO public.order_items VALUES (1, 5, 3);
INSERT INTO public.order_items VALUES (4, 1, 1);
INSERT INTO public.order_items VALUES (4, 3, 3);
INSERT INTO public.order_items VALUES (1, 3, 3);
INSERT INTO public.order_items VALUES (9, 3, 1);
INSERT INTO public.order_items VALUES (10, 1, 1);
INSERT INTO public.order_items VALUES (10, 3, 1);
INSERT INTO public.order_items VALUES (11, 3, 1);
INSERT INTO public.order_items VALUES (12, 7, 1);
INSERT INTO public.order_items VALUES (12, 8, 1);
INSERT INTO public.order_items VALUES (12, 9, 1);
INSERT INTO public.order_items VALUES (12, 10, 1);
INSERT INTO public.order_items VALUES (12, 3, 1);
INSERT INTO public.order_items VALUES (12, 5, 1);
INSERT INTO public.order_items VALUES (13, 10, 1);
INSERT INTO public.order_items VALUES (13, 9, 1);
INSERT INTO public.order_items VALUES (14, 9, 1);
INSERT INTO public.order_items VALUES (15, 5, 1);
INSERT INTO public.order_items VALUES (16, 3, 1);
INSERT INTO public.order_items VALUES (16, 9, 1);
INSERT INTO public.order_items VALUES (17, 9, 1);
INSERT INTO public.order_items VALUES (18, 9, 1);
INSERT INTO public.order_items VALUES (19, 9, 1);
INSERT INTO public.order_items VALUES (20, 9, 1);
INSERT INTO public.order_items VALUES (21, 9, 1);
INSERT INTO public.order_items VALUES (22, 10, 1);
INSERT INTO public.order_items VALUES (23, 9, 1);


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.orders OVERRIDING SYSTEM VALUE VALUES (3, 2, 'completed', 'shipped', '2024-12-19 01:38:23.853');
INSERT INTO public.orders OVERRIDING SYSTEM VALUE VALUES (4, 2, 'completed', 'not_shipped', '2024-12-19 01:38:47.402');
INSERT INTO public.orders OVERRIDING SYSTEM VALUE VALUES (5, 2, 'pending', 'delivered', '2024-12-19 01:39:02.829');
INSERT INTO public.orders OVERRIDING SYSTEM VALUE VALUES (1, 3, 'pending', 'delivered', '2024-12-19 00:46:54.500716');
INSERT INTO public.orders OVERRIDING SYSTEM VALUE VALUES (8, 2, 'completed', 'delivered', '2024-12-20 13:25:39.952');
INSERT INTO public.orders OVERRIDING SYSTEM VALUE VALUES (9, 55, 'pending', 'not_shipped', '2025-01-05 03:06:49.193');
INSERT INTO public.orders OVERRIDING SYSTEM VALUE VALUES (10, 55, 'pending', 'not_shipped', '2025-01-05 03:17:50.814');
INSERT INTO public.orders OVERRIDING SYSTEM VALUE VALUES (11, 55, 'pending', 'not_shipped', '2025-01-05 03:18:39.359');
INSERT INTO public.orders OVERRIDING SYSTEM VALUE VALUES (12, 55, 'pending', 'not_shipped', '2025-01-05 03:19:15.112');
INSERT INTO public.orders OVERRIDING SYSTEM VALUE VALUES (13, 38, 'completed', 'delivered', '2025-01-05 13:48:19.686');
INSERT INTO public.orders OVERRIDING SYSTEM VALUE VALUES (14, 38, 'pending', 'not_shipped', '2025-01-05 19:08:49.288');
INSERT INTO public.orders OVERRIDING SYSTEM VALUE VALUES (15, 38, 'pending', 'delivered', '2025-01-05 19:16:06.371');
INSERT INTO public.orders OVERRIDING SYSTEM VALUE VALUES (16, 38, 'pending', 'not_shipped', '2025-01-05 19:30:55.568');
INSERT INTO public.orders OVERRIDING SYSTEM VALUE VALUES (17, 38, 'pending', 'not_shipped', '2025-01-05 20:03:15.978');
INSERT INTO public.orders OVERRIDING SYSTEM VALUE VALUES (18, 38, 'pending', 'not_shipped', '2025-01-05 20:03:20.203');
INSERT INTO public.orders OVERRIDING SYSTEM VALUE VALUES (19, 38, 'pending', 'not_shipped', '2025-01-05 20:03:23.746');
INSERT INTO public.orders OVERRIDING SYSTEM VALUE VALUES (20, 38, 'pending', 'not_shipped', '2025-01-05 20:03:27.937');
INSERT INTO public.orders OVERRIDING SYSTEM VALUE VALUES (21, 38, 'pending', 'not_shipped', '2025-01-05 20:03:31.716');
INSERT INTO public.orders OVERRIDING SYSTEM VALUE VALUES (22, 38, 'pending', 'not_shipped', '2025-01-05 20:26:18.117');
INSERT INTO public.orders OVERRIDING SYSTEM VALUE VALUES (23, 38, 'pending', 'not_shipped', '2025-01-05 20:30:19.306');


--
-- Data for Name: product; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.product OVERRIDING SYSTEM VALUE VALUES (3, 9, 'Booster', 'Un super booster a ouvrir', 24.00, 2);
INSERT INTO public.product OVERRIDING SYSTEM VALUE VALUES (5, 2, 'Carte poke', '5 carte pokemon', 3.00, 2);
INSERT INTO public.product OVERRIDING SYSTEM VALUE VALUES (7, 3, 'Produit numéro 1', NULL, 8.00, NULL);
INSERT INTO public.product OVERRIDING SYSTEM VALUE VALUES (8, 3, 'Toupie Beyblade', NULL, 13.00, NULL);
INSERT INTO public.product OVERRIDING SYSTEM VALUE VALUES (1, 3, 'PC Portable', 'Super product', 1250.00, NULL);
INSERT INTO public.product OVERRIDING SYSTEM VALUE VALUES (4, 3, 'test', 'super', 9.00, 1);
INSERT INTO public.product OVERRIDING SYSTEM VALUE VALUES (9, 3, 'Toupie Beyblade 2', NULL, 13.00, NULL);
INSERT INTO public.product OVERRIDING SYSTEM VALUE VALUES (10, 38, 'Jeux vid', 'Super description blabla', 21.00, NULL);
INSERT INTO public.product OVERRIDING SYSTEM VALUE VALUES (11, 1, 'Figurine pokemon', 'Figurine 3D d''un pokemon', 13.99, 3);


--
-- Data for Name: profile; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.profile OVERRIDING SYSTEM VALUE VALUES (1, 'Jean', 'jean@mail.com', 'test1234', 'rue du pont', 'BE 999999', 5000.00, NULL);
INSERT INTO public.profile OVERRIDING SYSTEM VALUE VALUES (3, 'test', 'poirier@mail.com', '$argon2id$v=19$m=65536,t=3,p=4$0Pvwymi5P+0M5y0Zm8dxVg$4L7eQKbgx0srVOpWCygIaUjzEQ+hq1R6AcC9YtQSbuQ', NULL, NULL, 0.00, NULL);
INSERT INTO public.profile OVERRIDING SYSTEM VALUE VALUES (9, 'Seller', 'sell@mail.com', 'dwadaw', NULL, NULL, 0.00, NULL);
INSERT INTO public.profile OVERRIDING SYSTEM VALUE VALUES (10, 'Buyer', 'buy@mail.com', 'dwaqwe', NULL, NULL, 0.00, NULL);
INSERT INTO public.profile OVERRIDING SYSTEM VALUE VALUES (13, 'Seller Inc.', 'seller@example.com', 'securepassword', '456 Avenue Exemple', 'BE918332987654', 500.00, NULL);
INSERT INTO public.profile OVERRIDING SYSTEM VALUE VALUES (14, 'John Doe', 'john.doe@example.com', 'password123', '123 Rue Exemple', 'BE918332123456', 100.00, NULL);
INSERT INTO public.profile OVERRIDING SYSTEM VALUE VALUES (2, 'Jean2', 'jean2@mail.com', '$argon2id$v=19$m=65536,t=3,p=4$Egok0BBUrdSsFxEvpxCrVg$y9QExElnEnVWYyU7TUbYuN/DqxGKIUwgB88nMb94Shw', 'rue du ponti', 'BE 999999', 5000.00, NULL);
INSERT INTO public.profile OVERRIDING SYSTEM VALUE VALUES (27, 'wadvwadv', 'wadvwadv@dwav.wadv', '$argon2id$v=19$m=65536,t=3,p=4$qAB6dNxi58ozi876m50AAQ$aMeNM5gAiDCRkWR0bV5VM1qps4EPgtqg+5YY4rxQvk8', 'wadvvwad', 'wadvwadv', 222.00, NULL);
INSERT INTO public.profile OVERRIDING SYSTEM VALUE VALUES (28, 'Super Seller', 'supseller@mail.com', 'wadvwadvwadvwv', NULL, NULL, 0.00, NULL);
INSERT INTO public.profile OVERRIDING SYSTEM VALUE VALUES (29, 'Super Reviewer', 'reviewer@mail.com', 'abcdewadvavd', 'Avenue du chant', NULL, 0.00, NULL);
INSERT INTO public.profile OVERRIDING SYSTEM VALUE VALUES (30, 'Super Seller 2', 'supseller22@mail.com', 'dawvwvdva', NULL, NULL, 0.00, NULL);
INSERT INTO public.profile OVERRIDING SYSTEM VALUE VALUES (33, 'BUYEDWAVIDWAV', 'dwavdvwava@dvwadvaw.dwavwdva', '$argon2id$v=19$m=65536,t=3,p=4$4sNqSk8ho8MQcWxRImGusA$TfYqmykIDGRpr4DgLPJslTCuk1rbVcZgJXU+vCdRUoc', NULL, NULL, 0.00, NULL);
INSERT INTO public.profile OVERRIDING SYSTEM VALUE VALUES (34, 'SELKLER', 'dwavdvwava@dvwadvaw.dwavwdvadwa', '$argon2id$v=19$m=65536,t=3,p=4$KOBXrj+//IK38DZaSqddiA$5d8zX2CpP3+6IfZBM8G1xpejBRCOa/XGa8qyhy1ix+s', NULL, NULL, 0.00, NULL);
INSERT INTO public.profile OVERRIDING SYSTEM VALUE VALUES (37, 'dtretett', 'dwav@dwavvwad.dwav', '$argon2id$v=19$m=65536,t=3,p=4$mSaDf/5Fw8aI+9NvFuui/w$lr8p/HkQr+mexOkenGUrKqbMt4BMHQyzMJzr4XXYQqU', '', NULL, 0.00, NULL);
INSERT INTO public.profile OVERRIDING SYSTEM VALUE VALUES (36, 'dwavwadv', 'dvwadvwa@dwavdvwa.dwavwdv', '$argon2id$v=19$m=65536,t=3,p=4$XOk/3ZOeB3P4sb/8xHVUuA$kAE8nlaRvsKsQmj3X4ZE4fq/CaJdZs/hXctCpLAG1ik', '', 'BE2332332', 23332.00, NULL);
INSERT INTO public.profile OVERRIDING SYSTEM VALUE VALUES (42, 'Testeur Alex', 'test@test.com', '$argon2id$v=19$m=65536,t=3,p=4$BvTJliJe6FA3i+zBB1rDOA$RxP46myFrVRKpXR38qLhbeBwemIv7Da05q0uSQ9+3SQ', '', NULL, 0.00, NULL);
INSERT INTO public.profile OVERRIDING SYSTEM VALUE VALUES (40, 'test23', 'dwavv@ddwav.com', '$argon2id$v=19$m=65536,t=3,p=4$N9ogeD1ESj9MsMvNJH/BLw$kX/VTPtIdkfthsgtsWUdwvnm934o0Ca7rVAB8o3qBWI', 'dvawvdw', 'BE23424', 0.00, NULL);
INSERT INTO public.profile OVERRIDING SYSTEM VALUE VALUES (43, 'Test 2 Alex ', 'test12@test.com', '$argon2id$v=19$m=65536,t=3,p=4$IBpaEeuC7qL6gttzsXoUMw$7MmY8+wpiKMCC8w9TbEeNc2UzAen2sqDiA23ipDzXzY', '', NULL, 0.00, NULL);
INSERT INTO public.profile OVERRIDING SYSTEM VALUE VALUES (38, 'Alexandre Test', 'alexprint@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$6itfZ0p1MtLw/J1/scgMQg$WUD1/4lWnJfTmUvhG8A4yoTyj3OwXAlpDKi0LU8iNaA', 'rue du pont 43', 'BE41241512', 0.00, '5b84fbb0-f58c-4695-91f1-6fc97d31b7eb.jpeg');
INSERT INTO public.profile OVERRIDING SYSTEM VALUE VALUES (55, 'Alex Image', 'alexi@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$1oQ3qKyfrijtiXRTNFR6vg$WLF9Q0fB35WAx+ahyOwNbEuaisKFx80ROQM1Uad1ss4', 'Avenue du pont joli', 'BE4122332', 222.00, 'd0792e4c-2991-4149-b3e0-d190c07cc80b.jpeg');


--
-- Data for Name: review; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.review VALUES (1, 9, 3, 'Très bon produit.', '2024-12-18 15:34:43.2');
INSERT INTO public.review VALUES (2, 9, 5, 'excellent bon produit.', '2024-12-19 00:10:14.497');
INSERT INTO public.review VALUES (29, 28, 4, 'Creation seller et reviewer', '2024-12-20 14:26:12.907');
INSERT INTO public.review VALUES (1, 13, 2, 'davwvwa', '2024-12-20 14:24:55.28');
INSERT INTO public.review VALUES (1, 38, 2, 'Super vendeur', '2025-01-04 00:17:32.954716');
INSERT INTO public.review VALUES (2, 38, 1, NULL, '2025-01-04 00:19:06.587741');
INSERT INTO public.review VALUES (29, 38, 1, NULL, '2025-01-04 00:19:34.033194');
INSERT INTO public.review VALUES (38, 3, 3, 'Fast review', '2025-01-05 19:15:01.221');
INSERT INTO public.review VALUES (38, 2, 4, 'Fast review', '2025-01-05 19:16:39.323');


--
-- Name: manager_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.manager_id_seq', 1, true);


--
-- Name: orders_order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.orders_order_id_seq', 23, true);


--
-- Name: product_product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.product_product_id_seq', 11, true);


--
-- Name: profile_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.profile_user_id_seq', 62, true);


--
-- Name: manager manager_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.manager
    ADD CONSTRAINT manager_email_key UNIQUE (email);


--
-- Name: manager manager_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.manager
    ADD CONSTRAINT manager_pkey PRIMARY KEY (id);


--
-- Name: order_items order_items_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_pkey PRIMARY KEY (order_id, product_id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: product product_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_pkey PRIMARY KEY (id);


--
-- Name: profile profile_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profile
    ADD CONSTRAINT profile_email_key UNIQUE (email);


--
-- Name: profile profile_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profile
    ADD CONSTRAINT profile_pkey PRIMARY KEY (id);


--
-- Name: review review_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT review_pkey PRIMARY KEY (reviewer_id, seller_id);


--
-- Name: order_items order_items_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id);


--
-- Name: order_items order_items_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.product(id);


--
-- Name: orders orders_buyer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_buyer_id_fkey FOREIGN KEY (buyer_id) REFERENCES public.profile(id);


--
-- Name: product product_seller_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_seller_id_fkey FOREIGN KEY (seller_id) REFERENCES public.profile(id);


--
-- Name: review review_reviewer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT review_reviewer_id_fkey FOREIGN KEY (reviewer_id) REFERENCES public.profile(id);


--
-- Name: review review_seller_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT review_seller_id_fkey FOREIGN KEY (seller_id) REFERENCES public.profile(id);


--
-- PostgreSQL database dump complete
--

