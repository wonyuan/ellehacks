import React from 'react';
import { Box, Button, Text, useMantineTheme, Flex, MantineProvider } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { theme } from "@styles/theme.ts";

const Evaluation = () => {
    const m = useMantineTheme();
    const navigate = useNavigate();
  
    return (
      <MantineProvider theme={theme}>
        <Flex           
          direction="column"
          justify="center"
          align="center"
          sx={{ 
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              height: "100vh",
              backgroundImage: `url('/bg.png')`,
          }}
        >
          <Flex 
            direction="column"
            sx={{ 
                position: "relative",
                width: "900px",
                marginTop: "48px",
            }}
          >
            <Button 
              variant="gradient" 
              gradient={{ from: m.colors.moss[2], to: m.colors.moss[2], deg: 99 }}
              sx={{ 
                  position: "absolute",
                  top: "-48px",
                  zIndex: 10,
              }}
              onClick={() => navigate(-1)}
            >
              <IconArrowLeft size={20} />
              <Text sx={{ fontSize: "12px", marginLeft: "8px" }} fw={600}>
                Back
              </Text>
            </Button>

            <Box
              sx={{
                width: "100%",
                maxHeight: "80vh",
                overflowY: "auto",
                backgroundColor: m.colors.snow[3],
                borderRadius: "10px",
                padding: "48px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center", 
                alignItems: "center",
              }}
            >
              <Text sx={{ fontSize: "40px", color: m.colors.snow[4] }} fw={700}>
                Evaluation Page
              </Text>
              <Text sx={{ fontSize: "16px", color: m.colors.snow[4] }} fw={500}>
                Content will be added here.
              </Text>
            </Box>
          </Flex>
        </Flex>
      </MantineProvider>
    );
};

export default Evaluation;
