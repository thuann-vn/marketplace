
import { StyleSheet} from 'react-native';
export const CommonStyles = StyleSheet.create({
    button: {
      backgroundColor: '#666666',
      padding: 8,
      paddingHorizontal: 20,
      alignSelf: 'center',
      marginTop: 20
    },
    buttonLabel: {
      color: '#fff',
      textTransform: 'uppercase',
      fontSize: 14,
      fontWeight: '700'
    },
    input: {
      borderWidth: 0.5,
      borderColor: '#000',
      padding: 5,
      textAlign: 'center',
      marginBottom: 5
    },
    dropdown: {
      height: 30,
      borderTopRightRadius: 0,
      borderTopLeftRadius: 0,
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0,
      borderColor: '#000',
      borderWidth: 0.5,
      borderRadius: 0,
      textAlign: 'left',
    },
    checkbox: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomColor: 'transparent',
      borderWidth: 0,
      paddingHorizontal: 0,
      paddingVertical: 0,
      paddingLeft: 0,
      marginLeft: 0,
      backgroundColor: 'transparent'
    },
    loadingContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 10
    }
  });
  