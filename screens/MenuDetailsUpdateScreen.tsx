import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView ,ImageBackground} from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';

const MenuDetailsUpdateScreen: React.FC<{ navigation?: any }> = ({ navigation }) => {
  return (
        <ImageBackground
          source={require("../assets/images/main_Background.jpg")}
          style={styles.bg}
          resizeMode="cover"
        >

      <Text style={styles.title}>Menu Details & Update</Text>

      {/* Four Main Buttons */}
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => navigation?.navigate?.('Menu')}
        >
          <Text style={styles.btnText}>View Menu</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => navigation?.navigate?.('AddToMenu')}
        >
          <Text style={styles.btnText}>Add to Menu</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => navigation?.navigate?.('RemoveFromMenu')}
        >
          <Text style={styles.btnText}>Remove from Menu</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => navigation?.navigate?.('ResetConfirmation')}
        >
          <Text style={styles.btnText}>Reset Menu</Text>
        </TouchableOpacity>
      </View>

      {/* Back Button */}
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation?.goBack?.()}>
        <Entypo name="arrow-with-circle-left" size={20} color="white" />
       
      </TouchableOpacity>

  
        </ImageBackground>
  );
};

const styles = StyleSheet.create({

    bg: {
    flex: 1,
    width: '100%',
    height: '100%',
    padding: 0,
    resizeMode: 'stretch',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffffff',
    marginBottom: 50,
    justifyContent:'center',
    textAlign:"center",
    padding:20,
  },
  btnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
  },
  actionBtn: {
    backgroundColor: '#008080',
    borderRadius: 5,
    paddingVertical: 14,
    paddingHorizontal: 50,
    width: '90%',
    alignItems: 'center',
    marginBottom: 25,
    elevation: 3,
    justifyContent: 'center',
    left:35,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  backBtn: {
    position: 'absolute',
    bottom: 30,
    left: 25,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DC143C',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

});

export default MenuDetailsUpdateScreen;
