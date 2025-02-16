import { theme } from "@styles/theme.ts";
import { IconArrowLeft } from '@tabler/icons-react';
import { Box, Text, Button, Flex, MantineProvider, useMantineTheme} from '@mantine/core';

const Results = () => {
    const m = useMantineTheme();
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
                backgroundImage:`url('/bg.png')`,
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
                >
                    <IconArrowLeft size={20} />
                    <Text sx={{ fontSize: "12px", marginLeft: "8px" }} fw={600}>
                        back
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
                    justifyContent: "space-between", 
                }}
                >
                <Text sx={{ fontSize: "32px", color: m.colors.snow[4] }} fw={700}>
                    digging right into your results...
                </Text>
                <Text sx={{ fontSize: "16px", color: m.colors.snow[4] }} fw={500}>
                    firstly, it's important to know that you <i> are</i> doing your best. you're never alone in your journey through parenthood
                    and every step you try and take is a step in the right direction.
                </Text>
                
                </Box>
            </Flex>
        </Flex>
    </MantineProvider>
    );
};

export default Results;
