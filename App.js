import React, { createContext, useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const AuthContext = createContext();
const Tab = createBottomTabNavigator();

function LoginScreen({ goToSignup }) {

  const { signIn } = useContext(AuthContext);

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [emailValid,setEmailValid] = useState(null);

  const checkEmail = (text)=>{
    setEmail(text);

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(regex.test(text)){
      setEmailValid(true);
    }else{
      setEmailValid(false);
    }
  }

  return(
    <View style={styles.container}>

      <Text style={styles.title}>Sign In</Text>

      <Text>Email</Text>

      <TextInput
      style={styles.input}
      placeholder="Enter email"
      value={email}
      onChangeText={checkEmail}
      />

      {emailValid===true && (
        <Text style={{color:"green"}}>Email hợp lệ</Text>
      )}

      {emailValid===false && (
        <Text style={{color:"red"}}>Email không hợp lệ</Text>
      )}

      <Text>Password</Text>

      <TextInput
      style={styles.input}
      placeholder="Enter password"
      secureTextEntry
      value={password}
      onChangeText={setPassword}
      />

      <TouchableOpacity
      style={styles.loginBtn}
      onPress={()=>signIn(email,password)}
      disabled={!emailValid}
      >
        <Text style={styles.btnText}>Sign In</Text>
      </TouchableOpacity>

      <Text style={styles.or}>Or sign in with</Text>

      <View style={styles.socialRow}>
        <TouchableOpacity style={styles.googleBtn}>
          <Text>Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.fbBtn}>
          <Text style={{color:"white"}}>Facebook</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={goToSignup}>
        <Text style={styles.signupText}>Sign Up</Text>
      </TouchableOpacity>

    </View>
  )
}

function SignupScreen({ goToLogin }){

  const { signUp } = useContext(AuthContext);

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [emailValid,setEmailValid] = useState(null);

  const checkEmail = (text)=>{
    setEmail(text);

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(regex.test(text)){
      setEmailValid(true);
    }else{
      setEmailValid(false);
    }
  }

  return(
    <View style={styles.container}>

      <Text style={styles.title}>Sign Up</Text>

      <Text>Email</Text>

      <TextInput
      style={styles.input}
      placeholder="Enter email"
      value={email}
      onChangeText={checkEmail}
      />

      {emailValid===true && (
        <Text style={{color:"green"}}>Email hợp lệ</Text>
      )}

      {emailValid===false && (
        <Text style={{color:"red"}}>Email không hợp lệ</Text>
      )}

      <Text>Password</Text>

      <TextInput
      style={styles.input}
      placeholder="Enter password"
      secureTextEntry
      value={password}
      onChangeText={setPassword}
      />

      <TouchableOpacity
      style={styles.loginBtn}
      onPress={()=>signUp(email,password)}
      disabled={!emailValid}
      >
        <Text style={styles.btnText}>Create Account</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={goToLogin}>
        <Text style={styles.signupText}>Back to Login</Text>
      </TouchableOpacity>

    </View>
  )
}

function ExplorerScreen(){
  return(
    <View style={{flex:1,padding:15}}>

      <Text style={{fontSize:22,fontWeight:"bold",marginBottom:10}}>
        Explorer
      </Text>

      <TextInput
        style={styles.search}
        placeholder="Search for meals or area"
      />

      <Text style={styles.sectionTitle}>Top Categories</Text>

      <View style={styles.row}>
        <View style={styles.category}>
          <Text>🍕</Text>
          <Text>Pizza</Text>
        </View>

        <View style={styles.category}>
          <Text>🍔</Text>
          <Text>Burgers</Text>
        </View>

        <View style={styles.category}>
          <Text>🥩</Text>
          <Text>Steak</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Popular Items</Text>

      <View style={styles.foodCard}>
        <Text style={{fontSize:18}}>Food 1</Text>
        <Text>1$</Text>
      </View>

      <View style={styles.foodCard}>
        <Text style={{fontSize:18}}>Food 2</Text>
        <Text>3$</Text>
      </View>

    </View>
  )
}

function AccountScreen(){

  const { signOut } = useContext(AuthContext);

  return(
    <View style={{flex:1}}>

      <View style={styles.header}></View>

      <View style={styles.profile}>

        <Text style={styles.name}>Thanh Hieu</Text>

        <Text style={styles.job}>Mobile developer</Text>

        <Text style={styles.desc}>
          I have above 5 years of experience in native
          mobile apps development, now i am learning
          React Native
        </Text>

        <TouchableOpacity
        style={styles.loginBtn}
        onPress={signOut}
        >
          <Text style={styles.btnText}>Sign Out</Text>
        </TouchableOpacity>

      </View>

    </View>
  )
}

function Tabs(){
  return(
    <Tab.Navigator>
      <Tab.Screen name="Explorer" component={ExplorerScreen}/>
      <Tab.Screen name="Account" component={AccountScreen}/>
    </Tab.Navigator>
  )
}

export default function App(){

  const [user,setUser] = useState(null);
  const [accounts,setAccounts] = useState([]);
  const [screen,setScreen] = useState("login");

  const signUp = (email,password)=>{
    setAccounts([...accounts,{email,password}])
    alert("Đăng ký thành công")
    setScreen("login")
  }

  const signIn = (email,password)=>{
    const acc = accounts.find(a=>a.email===email && a.password===password)

    if(acc){
      setUser(acc)
    }else{
      alert("Sai tài khoản hoặc mật khẩu")
    }
  }

  const signOut = ()=>{
    setUser(null)
  }

  return(

    <AuthContext.Provider value={{signIn,signUp,signOut}}>

      <NavigationContainer>

        {user ? (
          <Tabs/>
        ) : screen==="login" ? (
          <LoginScreen goToSignup={()=>setScreen("signup")}/>
        ) : (
          <SignupScreen goToLogin={()=>setScreen("login")}/>
        )}

      </NavigationContainer>

    </AuthContext.Provider>

  )
}

const styles = StyleSheet.create({

container:{
flex:1,
justifyContent:"center",
padding:25
},

title:{
fontSize:30,
textAlign:"center",
marginBottom:30
},

input:{
borderWidth:1,
borderColor:"#ccc",
padding:10,
marginBottom:10,
borderRadius:6
},

loginBtn:{
backgroundColor:"orange",
padding:15,
alignItems:"center",
borderRadius:6,
marginTop:10
},

btnText:{
color:"white",
fontWeight:"bold"
},

or:{
textAlign:"center",
marginVertical:15
},

socialRow:{
flexDirection:"row",
justifyContent:"space-between",
marginBottom:20
},

googleBtn:{
flex:1,
borderWidth:1,
borderColor:"#ccc",
padding:12,
alignItems:"center",
borderRadius:5,
marginRight:10
},

fbBtn:{
flex:1,
backgroundColor:"#3b5998",
padding:12,
alignItems:"center",
borderRadius:5
},

signupText:{
color:"orange",
textAlign:"center",
marginTop:10
},

search:{
borderWidth:1,
borderColor:"#ccc",
padding:10,
borderRadius:8,
marginBottom:20
},

sectionTitle:{
fontSize:18,
fontWeight:"bold",
marginBottom:10
},

row:{
flexDirection:"row",
justifyContent:"space-between",
marginBottom:20
},

category:{
backgroundColor:"#f2f2f2",
padding:15,
borderRadius:10,
alignItems:"center",
width:90
},

foodCard:{
backgroundColor:"#fafafa",
padding:15,
borderRadius:10,
marginBottom:10,
borderWidth:1,
borderColor:"#eee"
},

header:{
height:150,
backgroundColor:"#19a7ce"
},

profile:{
alignItems:"center",
marginTop:-40,
padding:20
},

name:{
fontSize:22,
fontWeight:"bold"
},

job:{
color:"#19a7ce",
marginVertical:5
},

desc:{
textAlign:"center",
marginVertical:10
}

})