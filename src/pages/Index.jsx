import React, { useState } from "react";
import { Box, Container, VStack, Heading, Input, InputGroup, InputLeftAddon, Button, Text, useToast, Divider, useColorModeValue } from "@chakra-ui/react";
import { FaBolt, FaBurn, FaArrowRight } from "react-icons/fa";

const Index = () => {
  const [voltage, setVoltage] = useState("");
  const [current, setCurrent] = useState("");
  const [resistance, setResistance] = useState("");
  const [power, setPower] = useState("");
  const toast = useToast();

  const calculateOhmsLaw = (param) => {
    if (param === "voltage") {
      const calculatedVoltage = parseFloat(current) * parseFloat(resistance);
      if (!isNaN(calculatedVoltage)) setVoltage(calculatedVoltage);
    } else if (param === "current") {
      const calculatedCurrent = parseFloat(voltage) / parseFloat(resistance);
      if (!isNaN(calculatedCurrent)) setCurrent(calculatedCurrent);
    } else if (param === "resistance") {
      const calculatedResistance = parseFloat(voltage) / parseFloat(current);
      if (!isNaN(calculatedResistance)) setResistance(calculatedResistance);
    } else {
      toast({
        title: "Error",
        description: "Invalid calculation parameter!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const calculatePower = () => {
    const calculatedPower = parseFloat(voltage) * parseFloat(current);
    if (!isNaN(calculatedPower)) setPower(calculatedPower);
  };

  const bgColor = useColorModeValue("gray.100", "gray.700");
  const borderColor = useColorModeValue("gray.300", "gray.600");

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={4} align="stretch">
        <Heading as="h1" size="xl" textAlign="center" mb={6}>
          Electrical Calculations
        </Heading>

        <Box p={6} bg={bgColor} borderRadius="md" borderWidth="1px" borderColor={borderColor}>
          <Heading as="h2" size="lg" mb={4}>
            Ohm's Law
          </Heading>
          <InputGroup mb={4}>
            <InputLeftAddon children="Voltage (V)" />
            <Input placeholder="Enter voltage" value={voltage} onChange={(e) => setVoltage(e.target.value)} />
            <Button ml={2} leftIcon={<FaBolt />} onClick={() => calculateOhmsLaw("voltage")}>
              Calculate
            </Button>
          </InputGroup>
          <InputGroup mb={4}>
            <InputLeftAddon children="Current (I)" />
            <Input placeholder="Enter current" value={current} onChange={(e) => setCurrent(e.target.value)} />
            <Button ml={2} leftIcon={<FaArrowRight />} onClick={() => calculateOhmsLaw("current")}>
              Calculate
            </Button>
          </InputGroup>
          <InputGroup mb={4}>
            <InputLeftAddon children="Resistance (Ω)" />
            <Input placeholder="Enter resistance" value={resistance} onChange={(e) => setResistance(e.target.value)} />
            <Button ml={2} leftIcon={<FaBolt />} onClick={() => calculateOhmsLaw("resistance")}>
              Calculate
            </Button>
          </InputGroup>
        </Box>

        <Divider my={6} />

        <Box p={6} bg={bgColor} borderRadius="md" borderWidth="1px" borderColor={borderColor}>
          <Heading as="h2" size="lg" mb={4}>
            Power Calculation
          </Heading>
          <InputGroup mb={4}>
            <InputLeftAddon children="Power (P)" />
            <Input placeholder="Power result" value={power} readOnly />
            <Button ml={2} leftIcon={<FaBurn />} onClick={calculatePower}>
              Calculate
            </Button>
          </InputGroup>
          <Text fontSize="md">Enter the values for voltage and current above and calculate the power.</Text>
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;
