import { Group, Button, MantineProvider, useMantineTheme, Text, Flex, Image } from '@mantine/core';
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
        gap="0px"
        sx={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "100vh",
          backgroundImage:`url('/bg.png')`,
        }}>
        <Image 
          src="/hug.png" 
          alt="Hug" 
          width={90}  
          mb={0} 
          sx={{
            filter: "invert(100%)",
          }}
        />

        <Group>
          <Text sx={{ fontSize: "40px", color: m.colors.snow[0], marginRight:'-8px' }} fw={700} >
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
          {/* welcoming you to a space where you can learn to understand your teen, be honest, and share your thoughts, and be open to new ideas! */}
              learning to understand your teen and communicate your intentions is one of the hardest parts of being a parent,
              but it doesn't have to be. 
              {/* tell us exactly what the situation is, experience a mock scenario, and get some actionable advice. */}
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
