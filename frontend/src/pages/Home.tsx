// import { placeholderGet } from "@api/placeholder";
// import useRequest from "@hooks/useRequest";
import { Group, Button, MantineProvider, useMantineTheme, Text, Flex } from '@mantine/core';
import { theme } from "@styles/theme.ts";
import { useNavigate } from "react-router-dom";


const Home = () => {
  const m = useMantineTheme();
  const navigate = useNavigate();

  return (
    <MantineProvider theme={theme}>
    <Flex
          direction="column"
          justify="center"
          align="center"
          gap="8px"
      sx={{ 
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        backgroundImage:`url('/bg.png')`,
      }}>
      <Group>
        <Text 
          sx={{ fontSize: "40px", color: m.colors.snow[0], marginRight:'-8px' }} fw={700} >
          talk
        </Text>
        <Text
        sx={{fontSize: "40px"}}
        fw={900}
        variant="gradient"
        gradient={{ from: m.colors.snow[2], to: m.colors.snow[1], deg: 99 }}
      >
        to me
      </Text>
    </Group>
      <Text fz="md" sx={{ textAlign: "center", width: "38%", color: m.colors.snow[0] }}>
        placeholder description, placeholder description, placeholder description, placeholder description, placeholder description, placeholder description 
      </Text>
      <Button
        radius="sm"
        variant="gradient"
      gradient={{ from: m.colors.snow[2], to: m.colors.snow[1], deg: 99 }}
        sx={{ marginTop: "20px" }}
        onClick={() => navigate("/onboarding")}
      >
        PROFILE ME
      </Button>
    </Flex>
    </MantineProvider>
  );
};

export default Home;
