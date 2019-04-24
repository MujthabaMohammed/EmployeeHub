import { gql } from 'apollo-boost';

const getSkillsQuery = gql`
    {
        skills {
            name
            category
            id
            employees {
                name
                company
                image
                id
            }
        }
    }
`;

const getEmployeesQuery = gql`
    {
        employees {
            name
            company
            image
            id
            
        }
    }
`;

const addEmployeeMutation = gql`
    mutation AddEmployee($name: String!, $company: String!, $skillId: ID! , $image: String!){
        addEmployee(name: $name, company: $company, skillId: $skillId , image : $image){
            name
            id
        }
    }
`;


const addSkillMutation = gql`
    mutation AddSkill($name: String!, $category: String!){
        addSkill(name: $name, category: $category){
            name
            id
        }
    }
`;

const deleteEmployeeMutation = gql`
    mutation DeleteEmployee($id: ID!){
        deleteEmployee(id: $id){
            name
        }
    }
`;

const updateEmployeeMutation = gql`
    mutation UpdateEmployee($id: ID!,$name: String!, $company: String!, $skillId: ID! , $image: String!){
        updateEmployee(id: $id,name: $name, company: $company, skillId: $skillId , image : $image){
            name
        }
    }
`;

const getEmployeeQuery = gql`
    query GetEmployee($id: ID){
        employee(id: $id) {
            id
            name
            company
            skill {
                id
                name
                category
                employees {
                    name
                    id
                }
            }
        }
    }
`;




export { getSkillsQuery, getEmployeesQuery, addEmployeeMutation, addSkillMutation, deleteEmployeeMutation, updateEmployeeMutation, getEmployeeQuery };
