INSERT INTO `category` VALUES ('LA','Laptop'),('MO','Monitor'),('PC','Personal Computer');
INSERT INTO `location` VALUES ('HN','Hanoi'),('SG','Saigon');
INSERT INTO `asset` VALUES ('LA000001','Laptop Asus Vivobook S540','LA',1,'abc','2022-01-01','HN'),
                           ('LA000002','Laptop Dell 6630','LA',1,'abc','2022-01-01','HN'),
                           ('LA000003','Laptop Dell 7559','LA',0,'abc','2022-01-01','HN'),
                           ('LA000004','Laptop Asus Vivobook S540','LA',1,'laptop','2022-01-01','HN'),
                           ('LA000005','Laptop Dell 6630','LA',1,'this','2022-01-01','HN'),
                           ('LA000006','Laptop Dell 7559','LA',2,'is','2022-01-01','HN'),
                           ('LA000007','Laptop Asus Vivobook S540','LA',1,'my','2022-01-01','SG'),
                           ('LA000008','Laptop Dell 6630','LA',3,'full','2022-01-01','HN'),
                           ('MO000001','Monitor Dell','MO',1,'abc','2022-01-01','HN'),
                           ('MO000002','Monitor Asus','MO',0,'abc','2022-01-01','HN'),
                           ('MO000003','Monitor Gigabyte','MO',2,'abc','2022-07-21','HN'),
                           ('MO000004','Monitor Dell','MO',1,'sss','2022-01-01','HN'),
                           ('MO000005','Monitor Asus','MO',0,'ggg','2022-01-01','HN'),
                           ('MO000006','Monitor HP','MO',3,'hhhh','2022-07-21','HN'),
                           ('MO000007','Monitor Dell','MO',1,'dsds','2022-01-01','HN'),
                           ('MO000008','Monitor Asus','MO',3,'sss','2022-01-01','HN'),
                           ('MO000009','Monitor Gigabyte','MO',2,'hhh','2022-07-21','SG'),
                           ('PC000001','PC Dell','PC',1,'abc','2022-02-02','HN'),
                           ('PC000002','PC Gigabyte','PC',2,'abc','2022-07-21','HN'),
                           ('PC000003','PC Asus','PC',2,'abc','2022-07-10','HN'),
                           ('PC000004','PC Dell','PC',1,'lll','2022-02-02','HN'),
                           ('PC000005','PC Gigabyte','PC',2,'aaaa','2022-07-21','SG'),
                           ('PC000006','PC Asus','PC',4,'dd','2022-07-10','HN'),
                           ('PC000007','PC Dell','PC',3,'eee','2022-02-02','HN'),
                           ('PC000008','PC Gigabyte','PC',0,'hhhh','2022-07-21','SG'),
                           ('PC000009','PC Asus','PC',0,'rrr','2022-07-10','HN'),
                           ('PC000010','PC Dell','PC',0,'dfdss','2022-02-02','HN'),
                           ('PC000011','PC Gigabyte','PC',2,'hnfb','2022-07-21','SG'),
                           ('PC000012','PC Asus','PC',3,'ssss','2022-07-10','HN'),
                           ('PC000013','PC Dell','PC',2,'kkkk','2022-02-02','HN'),
                           ('PC000014','PC Gigabyte','PC',3,'dss','2022-07-21','SG'),
                           ('PC000015','PC Asus','PC',1,'sdsd','2022-07-10','HN'),
                           ('PC000016','PC Dell','PC',1,'tttt','2022-02-02','HN');
INSERT INTO `user` VALUES ('binhnv1','Bình','Nguyễn Văn','2017-05-12','2017-05-12','Male','ADMIN','SD0001','$2a$10$4xnXf5O4Di/xBKpiqueXI.lGQOS5rGaC/WoIl100HFSLVO8FaIADO','HN',1,0),('binhnv2','Bình','Nguyễn Văn','2016-06-05','2016-06-05','Male','ADMIN','SD0022','$2a$10$KewEir.17z8kR.Zhauj5fevWLIoB8C0/8A.EOg.OIZLoI4OonEdhS','HN',1,1),('datnt','Đạt','Nguyễn Thành','1990-07-05','2022-07-14','Male','ADMIN','SD0002','$2a$10$KewEir.17z8kR.Zhauj5fevWLIoB8C0/8A.EOg.OIZLoI4OonEdhS','HN',1,1),('ducnh','Đức','Nguyễn Hoàng','2017-05-12','2017-05-12','Male','ADMIN','SD0003','$2a$10$KewEir.17z8kR.Zhauj5fevWLIoB8C0/8A.EOg.OIZLoI4OonEdhS','HN',1,1),('haidb','Hải','Đặng Bích ','2016-06-05','2016-06-05','Female','ADMIN','SD0021','$2a$10$KewEir.17z8kR.Zhauj5fevWLIoB8C0/8A.EOg.OIZLoI4OonEdhS','SG',1,1),('hoangdt','Hoàng','Đặng Thái','2016-06-05','2016-06-05','Male','ADMIN','SD0016','$2a$10$KewEir.17z8kR.Zhauj5fevWLIoB8C0/8A.EOg.OIZLoI4OonEdhS','HN',1,1),('khanhmq','Khánh','Mai Quốc','1990-06-26','2022-02-26','Female','STAFF','SD0004','$2a$10$KewEir.17z8kR.Zhauj5fevWLIoB8C0/8A.EOg.OIZLoI4OonEdhS','HN',1,1),('kiencq','Kiên','Cao Quốc','2016-06-05','2016-06-05','Male','STAFF','SD0017','$2a$10$KewEir.17z8kR.Zhauj5fevWLIoB8C0/8A.EOg.OIZLoI4OonEdhS','HN',1,1),('lamhk','Lâm','Hoàng Khánh','2017-05-12','2017-05-12','Male','ADMIN','SD0005','$2a$10$KewEir.17z8kR.Zhauj5fevWLIoB8C0/8A.EOg.OIZLoI4OonEdhS','HN',1,1),('longlt','Long','Lý Tiểu','2017-05-12','2017-05-12','Female','ADMIN','SD0006','$2a$10$KewEir.17z8kR.Zhauj5fevWLIoB8C0/8A.EOg.OIZLoI4OonEdhS','HN',1,1),('phucnx','Phúc','Nguyễn Xuân','2017-05-12','2017-05-12','Male','ADMIN','SD0007','$2a$10$KewEir.17z8kR.Zhauj5fevWLIoB8C0/8A.EOg.OIZLoI4OonEdhS','SG',1,1),('phuonghv','Phương','Hoàng Việt','2016-06-05','2018-12-03','Male','ADMIN','SD0008','$2a$10$KewEir.17z8kR.Zhauj5fevWLIoB8C0/8A.EOg.OIZLoI4OonEdhS','SG',1,0),('phuongtv','Phương','Tạ Viết','2017-05-12','2017-05-12','Male','ADMIN','SD0009','$2a$10$KewEir.17z8kR.Zhauj5fevWLIoB8C0/8A.EOg.OIZLoI4OonEdhS','SG',1,1),('quannk','Quân','Nguyễn Khánh','2000-12-31','2021-12-26','Male','ADMIN','SD0010','$2a$10$4xnXf5O4Di/xBKpiqueXI.lGQOS5rGaC/WoIl100HFSLVO8FaIADO','HN',1,0),('quocnp','Quốc','Nguyễn Phú','2016-06-05','2018-12-03','Female','STAFF','SD0011','$2a$10$KewEir.17z8kR.Zhauj5fevWLIoB8C0/8A.EOg.OIZLoI4OonEdhS','SG',1,1),('sangdx','Sang','Đỗ Xuân','1990-07-07','2022-07-14','Female','STAFF','SD0012','$2a$10$KewEir.17z8kR.Zhauj5fevWLIoB8C0/8A.EOg.OIZLoI4OonEdhS','SG',1,0),('sanghx','Sang','Hoa Xuân','2016-06-05','2016-06-05','Male','STAFF','SD0020','$2a$10$KewEir.17z8kR.Zhauj5fevWLIoB8C0/8A.EOg.OIZLoI4OonEdhS','SG',1,1),('sangmx','Sang','Mai Xuân','2000-07-07','2022-07-12','Female','STAFF','SD0013','$2a$10$KewEir.17z8kR.Zhauj5fevWLIoB8C0/8A.EOg.OIZLoI4OonEdhS','SG',1,1),('tamdd','Tâm','Đỗ Đức','2017-05-12','2017-05-12','Male','ADMIN','SD0014','$2a$10$KewEir.17z8kR.Zhauj5fevWLIoB8C0/8A.EOg.OIZLoI4OonEdhS','SG',1,1),('thachnn','Thạch','Nguyễn Ngọc','2016-06-05','2018-12-03','Male','STAFF','SD0015','$2a$10$KewEir.17z8kR.Zhauj5fevWLIoB8C0/8A.EOg.OIZLoI4OonEdhS','HN',1,0),('thuongtt','Thương','Trần Thị','2016-06-05','2016-06-05','Female','STAFF','SD0018','$2a$10$KewEir.17z8kR.Zhauj5fevWLIoB8C0/8A.EOg.OIZLoI4OonEdhS','SG',1,1),('truongnx','Trường','Nguyễn Xuân','1996-06-05','2016-06-05','Male','ADMIN','SD0020','$2a$10$BB4vjeTbJEVLf8ZDX0W9leqYXNe198.CTvSut.a7swZh5qO8mXqK.','HN',1,0),('tuyench','Tuyền','Cao Hoàng','2016-06-05','2016-06-05','Female','ADMIN','SD0019','$2a$10$KewEir.17z8kR.Zhauj5fevWLIoB8C0/8A.EOg.OIZLoI4OonEdhS','SG',1,1);
INSERT INTO `authority` VALUES (1,'quannk','ADMIN'),
                               (2,'khanhmq','STAFF'),
                               (3,'sangmx','STAFF'),(4,'binhnv1','ADMIN'),(5,'phucnx','ADMIN'),(6,'longlt','ADMIN'),(7,'datnt','ADMIN'),(8,'ducnh','ADMIN'),(9,'lamhk','ADMIN'),(10,'phuonghv','ADMIN'),(11,'phuongtv','ADMIN'),(12,'quocnp','STAFF'),(13,'sangdx','STAFF'),(14,'tamdd','ADMIN'),(15,'thachnn','STAFF'),(16,'hoangdt','ADMIN'),(17,'kiencq','STAFF'),(18,'thuongtt','STAFF'),(19,'tuyench','ADMIN'),(20,'sanghx','STAFF'),(21,'haidb','ADMIN'),(22,'binhnv2','ADMIN'),(23,'truongnx','ADMIN');
INSERT INTO `assignment` VALUES (1,'thuongtt','LA000001','2021-05-06',0,'This is the note for the assignment of asset LA0001','2021-06-06','binhnv1','binhnv2',NULL),
                                (2,'longlt','MO000008','2022-06-26',1,'This is a new notation.',NULL,'binhnv2',NULL,NULL),
                                (3,'sangmx','LA000003','2022-03-09',0,'This is the note for the assignment of asset LA000003','2022-04-09','phuonghv','ducnh',NULL),
                                (4,'sanghx','MO000004','2022-06-01',0,'This is the note for the assignment of asset MO000001','2022-07-01','ducnh','haidb',NULL),
                                (5,'sangdx','MO000005','2022-07-27',0,'This is the note for the assignment of asset MO000002','2022-08-27','haidb','hoangdt',NULL),
                                (6,'quocnp','MO000006','2022-08-15',1,'This is the note for the assignment of asset MO000003',NULL,'tuyench',NULL,NULL),
                                (7,'kiencq','PC000001','2022-09-05',0,'This is the note for the assignment of asset PC000001','2022-10-05','tamdd','longlt',NULL),
                                (8,'khanhmq','PC000002','2022-09-05',0,'This is the note for the assignment of asset PC000002','2022-10-05','quannk','phucnx',NULL),
                                (9,'khanhmq','PC000003','2022-09-05',1,'This is the note for the assignment of asset PC000003',NULL,'phuongtv',NULL,NULL),
                                (10,'khanhmq','PC000016','2022-07-12',2,'This is the note for the assignment 10',NULL,'phuongtv',NULL,'khanhmq'),
                                (11,'khanhmq','MO000003','2022-07-05',3,'This is the note for the assignment 11','2022-07-15','phuongtv','phuongtv','hoangdt'),
                                (12,'quocnp','LA000003','2022-06-25',2,'This is the note for the assignment 12',NULL,'longlt',NULL,'tuyench'),
                                (13,'sangmx','PC000010','2022-07-05',2,'This is the note for the assignment 13',NULL,'longlt',NULL,'phuonghv'),
                                (14,'sanghx','MO000002','2022-07-06',3,'This is the note for the assignment 14','2022-07-15','tamdd','phuonghv','longlt'),
                                (15,'thachnn','MO000003','2022-06-02',3,'This is the note for the assignment 15','2022-06-18','binhnv2','binhnv2','thachnn'),
                                (16,'thuongtt','LA000008','2022-07-25',2,'This is the note for the assignment 16',NULL,'hoangdt',NULL,'thuongtt'),
                                (17,'kiencq','MO000006','2022-07-12',3,'This is the note for the assignment 17','2022-07-15','haidb','haidb','tamdd'),
                                (18,'thachnn','LA000005','2022-06-03',3,'This is the note for the assignment 18','2022-06-18','binhnv1','binhnv1','lamhk'),
                                (19,'thuongtt','PC000015','2022-07-29',2,'This is the note for the assignment 19',NULL,'hoangdt',NULL,'thuongtt'),
                                (20,'sangdx','MO000009','2022-08-02',2,'This is the note for the assignment 20',NULL,'tamdd',NULL,'phuongtv'),
                                (21,'sanghx','LA000006','2022-07-22',3,'This is the note for the assignment 21','2022-08-01','tuyench','hoangdt','sanghx'),
                                (22,'khanhmq','PC000004','2022-07-05',0,'This is the note for the assignment 22',NULL,'phuongtv',NULL,NULL),
                                (23,'khanhmq','PC000005','2022-06-05',1,'This is the note for the assignment 23',NULL,'phuongtv',NULL,NULL),
                                (24,'khanhmq','PC000006','2022-05-05',0,'This is the note for the assignment 24',NULL,'phuongtv',NULL,NULL);