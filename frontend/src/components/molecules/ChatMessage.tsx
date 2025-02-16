import { Box, Text } from '@mantine/core';
// import { IconSend } from '@tabler/icons-react';

interface Message {
  text: string;
  isUser: boolean;
}

const ChatMessage = ({ text, isUser }: Message & { isUser: boolean }) => {
  return (
    <Box
      sx={{
        alignSelf: isUser ? 'flex-end' : 'flex-start',
        backgroundColor: isUser ? '#E19C71' : '#FFF',
        padding: '8px 12px',
        borderRadius: '8px',
        margin: '4px 0',
        maxWidth: '80%',
        fontSize: '12px',
      }}
    >
      <Text>{text}</Text>
    </Box>
  );
};

export default ChatMessage;