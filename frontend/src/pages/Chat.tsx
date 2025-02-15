import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Button,
  Flex,
  Grid,
  MantineProvider,
  Text,
  Textarea,
  useMantineTheme,
  Avatar
} from '@mantine/core';
import { IconSend, IconArrowLeft } from '@tabler/icons-react';
import ChatMessage from '@molecules/ChatMessage';
import { useNavigate, useLocation } from 'react-router-dom';
import { theme } from '@styles/theme';
import { profiles } from '@constants/personas';
import { fetchChat } from '@api/messages';
import { fetchScenario } from '@api/scenario';

interface Message {
  text: string;
  isUser: boolean;
}

const Chat = () => {
  const m = useMantineTheme();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [scenario, setScenario] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const location = useLocation();
  const { persona, paragraph } = location.state || {}; 
  // console.log('YAA', persona, paragraph);
  const classification = persona?.classification as keyof typeof profiles;
  const profile = profiles[classification];

  useEffect(() => {
    const fetchScenarioData = async () => {
      if (paragraph) {
        try {
          const data = await fetchScenario({ params: { situation: paragraph } });
          setScenario(data.profile_intro);
        } catch (error) {
          console.error("Error fetching scenario:", error);
        }
      }
    };

    fetchScenarioData();
  }, [paragraph]); 

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // const submitChat = async () => {

  // }

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = input;
    setMessages((prev) => [...prev, { text: userMessage, isUser: true }]);
    setInput('');

    const params = {
      classification: persona.classification,
      situation: paragraph, 
      user_input: userMessage,
    };

    try {
      const data = await fetchChat({ params });
      console.log(data);
      const botResponse = data?.bot_response || "Sorry, I couldn't get a response.";
      console.log('bro', botResponse);
      setMessages((prev) => [...prev, { text: botResponse, isUser: false }]);
    } catch (error) {
      console.error('Error fetching chatbot response:', error);
    }
  };

  return (
    <MantineProvider theme={theme}>
      <Flex
        direction="column"
        justify="center"
        align="center"
        sx={{
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          height: '100vh',
          backgroundImage: `url('/bg.png')`,
        }}
      >
        <Flex direction="column" sx={{ position: 'relative', width: '900px', marginTop: '48px' }}>
          <Button
            variant="gradient"
            gradient={{ from: m.colors.moss[2], to: m.colors.moss[2], deg: 99 }}
            sx={{
              position: 'absolute',
              top: '-48px',
              zIndex: 10,
            }}
            onClick={() => navigate('/onboarding')}
          >
            <IconArrowLeft size={20} />
            <Text sx={{ fontSize: '12px', marginLeft: '8px' }} fw={600}>
              back
            </Text>
          </Button>

          <Grid gutter="md">
            <Grid.Col span={3}>
              <Box
                sx={{
                  height: '80vh',
                  backgroundColor: m.colors.snow[1],
                  borderRadius: '10px',
                  padding: '24px',
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'left',
                }}
              >
                <Text fw={700} sx={{ fontSize: '20px', color: m.colors.ebony[3], marginBottom: '16px' }}>
                  {profile.name}
                </Text>
                <Avatar color="blue" radius="sm" size={160} src={profile.headshot} sx={{marginBottom: "24px"}}/>
                <Text fw={700} sx={{ fontSize: '14px', color: m.colors.ebony[3] }}>
                so here's the sketch... 
                </Text>
                <Text sx={{ fontSize: '14px', color: m.colors.ebony[3], marginBottom: "42px"}}>
                  {scenario}
                </Text>
                <Button
                  onClick={() => navigate('/results')}
                  variant="gradient"
                  gradient={{ from: m.colors.snow[2], to: m.colors.snow[4], deg: 12 }}>
                  i'm done
                </Button>
              </Box>
            </Grid.Col>

            <Grid.Col span={9}>
              <Box
                sx={{
                  height: '80vh',
                  backgroundColor: m.colors.snow[3],
                  borderRadius: '10px',
                  padding: '32px',
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <Box
                  sx={{
                    flexGrow: 1,
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Text><i>{profile.name} is ready to speak... try to figure out whats wrong</i></Text>
                  {messages.map((msg, index) => (
                    <ChatMessage key={index} text={msg.text} isUser={msg.isUser} />
                  ))}
                  <div ref={messagesEndRef} />
                </Box>

                <Flex gap="sm" mt="24px">
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.currentTarget.value)}
                    placeholder="Type your message..."
                    autosize
                    minRows={1}
                    sx={{ flexGrow: 1 }}
                  />
                  <Button
                    onClick={sendMessage}
                    variant="gradient"
                    gradient={{ from: m.colors.ebony[1], to: m.colors.eerie[1], deg: 45 }}
                  >
                    <IconSend size={20} />
                  </Button>
                </Flex>
              </Box>
            </Grid.Col>
          </Grid>
        </Flex>
      </Flex>
    </MantineProvider>
  );
};

export default Chat;
