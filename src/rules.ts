const eqSet = (xs:Set<string>, ys:Set<string>):boolean => // Compares the two sets to see if they're equal
    xs.size === ys.size && [...xs].every((x) => ys.has(x)); // if xs and ys == same size and every element in xs is also in ys == true

type Rule = {
  propositions: any [], //array containing it's own definitions
  logic_functions: string [], // array containing the logic definitions
  consequent: any [], //consequence of the rule being true, which tells if the person is sick or not
  consequent_two: any []
}

export var medical_rule: Rule = { //medical_rule that stems from Rule
  propositions: [
      {'name': 'temperature', 'value':37, "relation":">="}, //the definitions
      {'name': 'headache', 'value': true, "relation":"=="}
  ],
  logic_functions: ['&&'], //logical function, if definition 1 && definition 2 are true then action
  consequent: [action()], //action returns, that you are sick
  consequent_two: [action_two()]
}

function action():string{ //action from the consequence
  return("You are sick!");
}

function action_two(): string{
  return("You are not sick!")
}

export function check_rule(rule: Rule,args:any [] ):any{ //function to check if the rule is true or false, in this case rule == medical_rule and args == the symptoms.
  // rules and args have the same length
  if(args.length == rule.propositions.length){  //if the length of the args == the propositions length then it verifies it's integrity
      //Verify if the keys are the same      
      let args_keys: any = new Set(); //initializes sets
      let prop_keys: any = new Set();
      for(let i=0; i< args.length; ++i){  //for loop, args[0] == {"temperature": 37}, args[1] == {"headache": boolean}
          for(let j in args[i]) //j in args[0]
              args_keys.add(j); //add j to args_keys
          prop_keys.add(rule.propositions[i]['name']); //rule proposition[0] == "temperature" to prop_keys, rule proposition[1] == "headache"
      }

      //args_keys is going to be {"temperature", "headache"} and prop_keys is also going to be {"temperature", "headache"} but in sets, making sure that eqSet can be compared

      let prop_result: boolean = false; //initializes a variable
      if (eqSet(prop_keys, args_keys)){ //if the eqSet of the other 2 sets that were created before
          for(let k: number=0; k < rule.propositions.length; ++k){ //counting variable
              let prop_name: string = rule.propositions[k]['name']; // prop_name == rule.proposition[0]["name"] == "temperature"
              if(k == 0){
                 prop_result = eval(args[k][prop_name]+rule.propositions[k]['relation']+ rule.propositions[k]['value']); // args[0]["temperature"] == 37 + rule.proposition[0]['relation'] == >= + rule.proposition[0]['value'] == 37            
              } else {                    
                 prop_result = eval( prop_result.toString() + " " +  rule.logic_functions[(k-1)] +" " + args[k][prop_name]+rule.propositions[k]['relation']+ rule.propositions[k]['value']);  // prop_result.toString() == true, rule.logic_functions[(k-1)] == "&&" args[1]["headache"] == true + rule.proposition[1]['relation'] == == + rule.proposition[1]['value'] == true (true && (true == true)) > (true && true)
              }   
          }            
      }
      if (prop_result) //prop_result should be true
          return rule.consequent[0] //return action (), which is console.log("You are sick!")
      return rule.consequent_two[0]; //return prop_result == false
  }
}

