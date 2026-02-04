import React from "react";
import {
  FlatList,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle
} from "react-native";

export interface Column {
  key: string;
  title: string;
  render?: (item: any) => React.ReactNode;
  unit?: string;
  msDate?: boolean;
}

export interface ScrollableDataTableProps {
  data: any[];
  columns: Column[];
  headerStyle?: ViewStyle;
  rowStyle?: ViewStyle;
  headerTextStyle?: TextStyle;
  cellTextStyle?: TextStyle;
  onRowPress?: (item: any) => void; // new prop for row click
  onCellPress?: (col: Column) => void; // new prop for row click
}

export const ScrollableDataTable: React.FC<ScrollableDataTableProps> = ({
  data,
  columns,
  headerStyle,
  rowStyle,
  headerTextStyle,
  cellTextStyle,
  onRowPress,
}) => {
  const renderRow = ({ item }: { item: any }) => (
    <TouchableOpacity
      onPress={() => onRowPress && onRowPress(item)}
      activeOpacity={0.7}
    >
      <View style={[{ flexDirection: "row", padding: 8 }, rowStyle]}>
        {columns.map((col) => (
          <View key={col.key} style={{ flex: 1 }}>
            {col.msDate === true ? 
              <Text style={cellTextStyle}>
                {`${new Date(item[col.key]).toLocaleString('en-GB', {
                  month: "short",
                  day: 'numeric',
                  year: 'numeric'
                })}`}
              </Text> :
            col.unit ?
              <Text style={cellTextStyle}>
                {item[col.key].toFixed(4)} {item[col.unit]}
              </Text> :
            col.render ?
            col.render(item) : 
              <Text style={cellTextStyle}>{item[col.key]}</Text>
            }
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View
      style={[{ flexDirection: "row", backgroundColor: "#eee", paddingVertical: 8, borderRadius: 16, padding: 12, alignItems: 'center', marginBottom: 24 }, headerStyle]}
    >
      {columns.map((col) => (
        <View key={col.key} style={{ flex: 1 }}>
          <Text style={[{ fontWeight: "bold" }, headerTextStyle]}>{col.title}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderRow}
      keyExtractor={(item, index) => index.toString()}
      ListHeaderComponent={renderHeader}
      stickyHeaderIndices={[0]}
    />
  );
};
