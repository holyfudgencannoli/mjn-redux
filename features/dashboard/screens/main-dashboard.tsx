import { ScreenPrimative } from "@components/screen-primative";
import { LinearGradient } from 'expo-linear-gradient';
import { View } from "react-native";
// import { useDashboardService } from "@hooks/use-dashboard-service";
// import useItemService from "@hooks/use-item-service";
// import { useStyles } from "@hooks/use-styles";
// import GalleryScreen from "@app/purchases";
import { useStyles } from '@/theme/hooks/use-styles';
import { useTheme } from "@/theme/hooks/use-theme";
import { useFocusEffect } from "@react-navigation/native";
import * as NavBar from 'expo-navigation-bar';
import { useRouter } from "expo-router";
import { useCallback } from "react";
import SystemNavigationBar from 'react-native-system-navigation-bar';


export default function MainDashboard() {
  // const db = useSQLiteContext();
  // const itemService = useItemService();
  // const dashboardService = useDashboardService();
  const router = useRouter();
  const navigation = router
  const { app } = useStyles();
  const { scheme, shades } = useTheme();
  const { secondary, neutral } = shades;
  
  
  const setNavBar = async() => {
    await SystemNavigationBar.navigationHide()
  }

  useFocusEffect(
    useCallback(() => {
      NavBar.setVisibilityAsync('hidden');
      NavBar.setBehaviorAsync('overlay-swipe');
      return () => {}
    }, [])
  );


  return(
    <ScreenPrimative edges={[]}>
      <View style={app.container}>
        <LinearGradient 
          start={{ x: 0.3, y: 0 }}
          end={{ x: 0.3, y: 1 }}
          locations={[0.1, 0.25, 0.77, 1]}
          colors={scheme === 'dark' ? [neutral["700"], secondary["600"], secondary["500"], secondary["400"]] : [neutral["300"], neutral["400"], neutral["500"], neutral["600"]]}  
          style={{ flex: 1 }}
        >
          {/* <GalleryScreen /> */}
          {/* <SwipeableDataTable
            categories={[{
              title: 'All',
              key: 'all',
              data: dashboardService.allCategories
            }]}
            columns={[
              {
                key: 'category',
                title: 'Category',
              }
            ]}
            headerStyle={{ flex: 1 }}
            rowStyle={{ backgroundColor: 'transparent' }}
          /> */}
        </LinearGradient>  
      </View>
    </ScreenPrimative>      
  )
}