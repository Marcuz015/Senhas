const ListItem = React.memo(
    ({ item, index, handlePress }) => {
      const [show, setShow] = React.useState(false);
  
      React.useEffect(() => {
        setShow(showItems && selectedItem === item);
      }, [showItems, selectedItem, item]);
  
      return (
        <TouchableOpacity onPress={() => handlePress(item)}>
          <View style={[styles.listItem, { flexDirection: 'column', padding: 10, backgroundColor: '#fff' }]}>
            <Text style={styles.where}>{item.where}</Text>
            {show && <Text>{item.password}</Text>}
          </View>
        </TouchableOpacity>
      );
    },
    (prevProps, nextProps) => {
      return prevProps.item.where === nextProps.item.where && prevProps.item.password === nextProps.item.password;
    }
  );