import { Center, Heading, Text, VStack } from '@chakra-ui/layout';
import Dashboard from './dashboard';

const Logo = () => {
    return (
        <VStack w="full" h="full" spacing={1} justify="center">
            <Center>
                <Heading fontSize="6xl">blackfury</Heading>
            </Center>
            <Center>
                <Text fontSize="xl">Your all in one FURY wallet</Text>
            </Center>
            <Center py={10}>
                <Dashboard />
            </Center>
        </VStack>
    );
};
export default Logo;
