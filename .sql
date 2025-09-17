create table conversations (
  id int auto_increment primary key,
  type ENUM('private') not null,
  created_at timestamp default current_timestamp
);
create table conversation_mambers (
  id int auto_increment primary key,
  conversation_id int not null,
  user_id int not null,
  joined_at timestamp default current_timestamp,
  foreign key (conversation_id) references conversations(id),
  foreign key (user_id) references users(id)
);
create table messages (
  id int auto_increment primary key,
  conversation_id int not null,
  sender_id int not null,
  content text not null,
  created_at timestamp default current_timestamp,
  foreign key (conversation_id) references conversations(id),
  foreign key (sender_id) references users(id)
);