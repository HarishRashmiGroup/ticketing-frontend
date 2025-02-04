import React, { useState } from "react";
import {
    Box,
    Grid,
    Card,
    CardHeader,
    CardBody,
    Heading,
    Text,
    Stat,
    StatLabel,
    StatNumber,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Button,
    IconButton,
    Stack,
} from "@chakra-ui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Dashboard = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const incidentStats = { open: 12, closed: 45 };
    const serviceStats = { open: 8, closed: 30 };

    const recentRequests = [
        { id: 101, type: "Incident", status: "Open", created: "2024-02-01" },
        { id: 102, type: "Service", status: "Closed", created: "2024-02-02" },
        { id: 103, type: "Incident", status: "Open", created: "2024-02-03" },
        { id: 104, type: "Service", status: "Open", created: "2024-02-04" },
        { id: 105, type: "Incident", status: "Closed", created: "2024-02-05" },
        { id: 106, type: "Service", status: "Open", created: "2024-02-06" },
        { id: 107, type: "Incident", status: "Closed", created: "2024-02-07" },
        { id: 108, type: "Service", status: "Open", created: "2024-02-08" },
    ];

    const totalPages = Math.ceil(recentRequests.length / itemsPerPage);
    const paginatedRequests = recentRequests.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <Box p={6}>

            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4} mb={6}>
                <Card bg="blue.50">
                    <CardHeader>
                        <Heading size="md">Incident Requests</Heading>
                    </CardHeader>
                    <CardBody>
                        <Stack
                            direction={{ base: "column", md: "row" }}
                            spacing={4}
                            justifyContent={{ md: "space-between" }}
                            align="center"
                        >
                            <Stat>
                                <StatLabel>Open</StatLabel>
                                <StatNumber color="red.500">{incidentStats.open}</StatNumber>
                            </Stat>
                            <Stat>
                                <StatLabel>Closed</StatLabel>
                                <StatNumber color="green.500">{incidentStats.closed}</StatNumber>
                            </Stat>
                        </Stack>
                    </CardBody>
                </Card>

                <Card bg="gray.50">
                    <CardHeader>
                        <Heading size="md">Service Requests</Heading>
                    </CardHeader>
                    <CardBody>
                        <Stack
                            direction={{ base: "column", md: "row" }}
                            spacing={4}
                            justifyContent={{ md: "space-between" }}
                            align="center"
                        >
                            <Stat>
                                <StatLabel>Open</StatLabel>
                                <StatNumber color="red.500">{serviceStats.open}</StatNumber>
                            </Stat>
                            <Stat>
                                <StatLabel>Closed</StatLabel>
                                <StatNumber color="green.500">{serviceStats.closed}</StatNumber>
                            </Stat>
                        </Stack>
                    </CardBody>
                </Card>
            </Grid>

            <Card>
                <CardBody>
                    <Table variant="striped" colorScheme="gray">
                        <Thead>
                            <Tr>
                                <Th>ID</Th>
                                <Th>Type</Th>
                                <Th>Status</Th>
                                <Th>Created On</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {paginatedRequests.map((request) => (
                                <Tr key={request.id}>
                                    <Td>{request.id}</Td>
                                    <Td>{request.type}</Td>
                                    <Td color={request.status === "Open" ? "red.500" : "green.500"}>
                                        {request.status}
                                    </Td>
                                    <Td>{request.created}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>

                    <Box display="flex" justifyContent="space-between" mt={4}>
                        <IconButton
                            icon={<ChevronLeft />}
                            isDisabled={currentPage === 1}
                            onClick={() => setCurrentPage((prev) => prev - 1)}
                        />
                        <Text>
                            Page {currentPage} of {totalPages}
                        </Text>
                        <IconButton
                            icon={<ChevronRight />}
                            isDisabled={currentPage === totalPages}
                            onClick={() => setCurrentPage((prev) => prev + 1)}
                        />
                    </Box>
                </CardBody>
            </Card>
        </Box>
    );
};

export default Dashboard;
