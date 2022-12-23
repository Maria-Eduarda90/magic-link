import { useState } from "react";
import type { NextPage } from "next";
import { supabaseClient } from "../lib/supabaseClient";
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    useColorModeValue,
} from "@chakra-ui/react";
const Login: NextPage = () => {

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    
    const handleLogin = async (email: string) => {
        try {
            setLoading(true);
            const { error } = await supabaseClient.auth.signInWithOtp({ email });
            if (error) throw error;
            alert("Check your email for the login link!");
        } catch (error: any) {
            alert(error.error_description || error.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <Flex
            minH={"100vh"}
            align={"center"}
            justify={"center"}
            bg={useColorModeValue("gray.50", "gray.800")}
        >
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                <Stack align={"center"}>
                    <Heading fontSize={"4xl"}>Faça login em sua conta!</Heading>
                </Stack>
                <Box
                    rounded={"lg"}
                    bg={useColorModeValue("white", "gray.700")}
                    boxShadow={"lg"}
                    p={8}
                >
                    <Stack spacing={4}>
                        <FormControl id="email">
                            <FormLabel>Entre com seu email</FormLabel>
                            <Input
                                type="email"
                                placeholder="Alex@gmail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormControl>
                        <Stack spacing={10}>
                            <Button
                                isLoading={loading}
                                bg={"pink.500"}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleLogin(email);
                                }}
                                color={"white"}
                                _hover={{
                                    bg: "pink.400",
                                }}
                            >
                                Send magic link
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
};

export default Login;