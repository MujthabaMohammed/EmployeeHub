const graphql = require('graphql');
const Employee = require('../models/Employee');
const Skill = require('../models/Skill');
const _ = require('lodash');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

const EmployeeType = new GraphQLObjectType({
    name: 'Employee',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        company: { type: GraphQLString },
		image: { type : GraphQLString },
        skill: {
            type: SkillType,
            resolve(parent, args){
                return Skill.findById(parent.skillId);
            }
        }
    })
});

const SkillType = new GraphQLObjectType({
    name: 'Skill',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        category: { type: GraphQLString },
        employees: {
            type: new GraphQLList(EmployeeType),
            resolve(parent, args){
                return Employee.find({ skillId: parent.id });
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        employee: {
            type: EmployeeType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return Employee.findById(args.id);
            }
        },
        skill: {
            type: SkillType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return Skill.findById(args.id);
            }
        },
        employees: {
            type: new GraphQLList(EmployeeType),
            resolve(parent, args){
                return Employee.find({});
            }
        },
        skills: {
            type: new GraphQLList(SkillType),
            resolve(parent, args){
                return Skill.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addSkill: {
            type: SkillType,
            args: {
                name: { type: GraphQLString },
                category: { type: GraphQLString }
            },
            resolve(parent, args){
                let skill = new Skill({
                    name: args.name,
                    category: args.category
                });
                return skill.save();
            }
        },
        addEmployee: {
            type: EmployeeType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                company: { type: new GraphQLNonNull(GraphQLString) },
				image: { type: new GraphQLNonNull(GraphQLString) },
                skillId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args){
                let employee = new Employee({
                    name: args.name,
                    company: args.company,
                    skillId: args.skillId,
					image:args.image
                });
                return employee.save();
            }
        },
		
		deleteEmployee: {
			type: EmployeeType,
			args : {
				id: {type: new GraphQLNonNull(GraphQLID)}
			},
			resolve(parent, args){
				 return Employee.findByIdAndDelete(args.id);
			}
		},
		deleteSkill: {
			type: SkillType,
			args : {
				id: {type: new GraphQLNonNull(GraphQLID)}
			},
			resolve(parent, args){
				 return Skill.findByIdAndDelete(args.id);
			}
		},
		updateEmployee: {
			type: EmployeeType,
			args: {
						id: {type: new GraphQLNonNull(GraphQLID)},
						name: { type: new GraphQLNonNull(GraphQLString) },
						company: { type: new GraphQLNonNull(GraphQLString) },
						image: { type: new GraphQLNonNull(GraphQLString) },
						skillId: { type: new GraphQLNonNull(GraphQLID) }
    },
    resolve(parent, args) {
        return Employee.findByIdAndUpdate(args.id, {$set: {name: args.name, company: args.company , image: args.image , skillId: args.skillId}}).exec();
    }
}
			
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});