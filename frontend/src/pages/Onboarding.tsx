import { Box, Text, Button, Flex, MantineProvider, useMantineTheme, Textarea, Card, Image, Grid } from '@mantine/core';
import useRequest from "@hooks/useRequest";
import { useState } from 'react';
import { theme } from "@styles/theme.ts";
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import { personas } from "@constants/personas.ts"
import { useNavigate } from "react-router-dom";
import { fetchPersona } from "@api/persona";
import useLoading from "@context/loadingContext";


const Onboarding = () => {
  const m = useMantineTheme();
  const [problem, setProblem] = useState('');
  const navigate = useNavigate();
  const { setLoading } = useLoading();

  const { makeRequest } = useRequest({
    request: fetchPersona,
    requestByDefault: false,
  });

  const handleSubmit = async () => {
    setLoading(true);
    const response = await makeRequest({ paragraph: problem });
    setLoading(false);
    
    if (response) {
      navigate("/chat", { state: { persona: response, paragraph: problem } });
      setProblem('');
    }
  };

  // post paragraph to backend get it again

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
                width: "800px",
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
                onClick={() => navigate("/")}
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
            <Text sx={{ fontSize: "26px", color: m.colors.snow[4] }} fw={700}>
                lay it on me...
            </Text>
            <Text sx={{ fontSize: "12px", color: m.colors.snow[4] }} fw={500}>
                {/* as moms, we've all been there; it's getting harder to relate to your teen and you're not sure how to bridge that evergrowing gap.
                tell us exactly what the situation is, and we'll try our best to mimic a similar scenario and give you some actionable advice. */}
                try to describe as much as you can in detail about your teenager and the situation you're facing.
            </Text>
            <Text sx={{ fontSize: "12px", color: m.colors.snow[4] }} fw={500}>
                with that being said, what's been going on exactly?

            </Text>
            <Textarea
                value={problem}
                onChange={(event) => setProblem(event.currentTarget.value)}
                placeholder="give me the details..."
                size="sm"
                sx={{ marginTop: "12px", marginBottom: "24px", height:"200px" }}
            />
            <Text sx={{ fontSize: "12px", color: m.colors.ebony[4], marginBottom: "24px" }} fw={500}>
                we'll then assess your situation and drop you into a conflict scenario with a teenager persona most similar to
                your own. navigate through the conversation and do your best to resolve the conflict as you would with your 
                own teenager, and we'll do our best to help you find out what's going wrong. 
            </Text>
            <Grid>
                {Object.keys(personas).map((key) => (
                <Grid.Col span={3} key={key}>
                    <Card
                    shadow="sm"
                    padding="xl"
                    component="a"
                    sx={{
                        display: 'flex',
                        width: '165px',
                        height: '305px',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        transition: 'transform 0.2s ease-in-out',
                        '&:hover': {
                        transform: 'scale(1.05)', 
                        },
                    }}
                    >
                    <Card.Section>
                        <Image
                        src={personas[key as keyof typeof personas].image}
                        h={160}
                        alt={personas[key as keyof typeof personas].name}
                        />
                    </Card.Section>
                    <Text fw={500} sx={{ fontSize: "14px" }} mt="md" color="dark">
                        {personas[key as keyof typeof personas].name}
                    </Text>
                    <Text mt="xs" c="dimmed" size="sm">
                        {personas[key as keyof typeof personas].desc}
                    </Text>
                    </Card>
                </Grid.Col>
                ))}
            </Grid>
            
            <Button
                variant="gradient"
                gradient={{ from: m.colors.moss[2], to: m.colors.moss[2], deg: 99 }}
                sx={{
                alignSelf: "flex-end",
                marginTop: "24px",
                padding: "10px 12px",
                }}
                onClick={handleSubmit}
            >
                <Text sx={{ fontSize: "12px", marginRight: "4px" }} fw={600}>
                let's go!
                </Text>
                <IconArrowRight size={20} />
            </Button>
            </Box>
        </Flex>
    </Flex>
    </MantineProvider>
  );
};

export default Onboarding;