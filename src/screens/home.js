import React from 'react';
import {View, Text} from 'react-native';
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  List,
  Headline,
} from 'react-native-paper';

const Home = () => {
  return (
    <View>
      <Headline style={{marginLeft: 23}}>Lastest Post</Headline>
      <Card
        style={{
          shadowOffset: {width: 5, height: 5},
          width: '90%',
          borderRadius: 12,
          alignSelf: 'center',
          marginBottom: 10,
        }}>
        <Card.Content>
          <Title>Blog post</Title>
          <Card.Cover
            style={{
              width: '100%',
              height: 190,
              alignSelf: 'center',
            }}
            source={{
              uri:
                'https://images.unsplash.com/photo-1573921470445-8d99c48c879f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
            }}
          />
          <Paragraph>just a blog post</Paragraph>
        </Card.Content>
      </Card>
    </View>
  );
};

export default Home;
