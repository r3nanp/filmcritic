import { Colors } from "@/constants/Colors";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { WebView } from "react-native-webview";

/**
 * This component is used to display a trailer modal.
 */
export const TrailerModal = ({
  onClose,
  trailerUrl,
}: {
  onClose: () => void;
  trailerUrl: string;
}) => {
  const [webViewError, setWebViewError] = useState(false);

  const handleWebViewError = useCallback(() => {
    setWebViewError(true);
  }, []);

  const handleWebViewLoad = useCallback(() => {
    setWebViewError(false);
  }, []);

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalHeader}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.modalTitle}>Trailer</Text>
        <View style={styles.placeholder} />
      </View>

      {/* WebView Container */}
      <View style={styles.webViewContainer}>
        {webViewError ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Erro ao carregar o trailer</Text>
            <TouchableOpacity
              style={styles.retryButton}
              onPress={() => setWebViewError(false)}
            >
              <Text style={styles.retryButtonText}>Tentar novamente</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <WebView
            source={{
              uri: trailerUrl
                ?.replace("watch?v=", "embed/")
                .replace("youtu.be/", "youtube.com/embed/"),
            }}
            style={styles.webView}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
            scalesPageToFit={true}
            bounces={false}
            scrollEnabled={false}
            allowsFullscreenVideo={true}
            allowsInlineMediaPlayback={true}
            mediaPlaybackRequiresUserAction={false}
            onError={handleWebViewError}
            onLoad={handleWebViewLoad}
            renderLoading={() => (
              <View style={styles.webViewLoading}>
                <ActivityIndicator size="large" color={Colors.primary} />
                <Text style={styles.loadingText}>Carregando trailer...</Text>
              </View>
            )}
            mixedContentMode="compatibility"
            thirdPartyCookiesEnabled={true}
            sharedCookiesEnabled={true}
          />
        )}
      </View>

      <View style={styles.modalFooter}>
        <TouchableOpacity onPress={onClose} style={styles.footerCloseButton}>
          <Text style={styles.footerCloseButtonText}>Fechar Trailer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: Platform.OS === "ios" ? 44 : StatusBar.currentHeight || 0,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#000",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  closeButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: "semibold",
    fontWeight: "semibold",
  },
  modalTitle: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: "semibold",
    fontWeight: "semibold",
  },
  placeholder: {
    width: 40,
  },
  webViewContainer: {
    flex: 1,
    backgroundColor: "#000",
    margin: 16,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  webView: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  webViewLoading: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  loadingText: {
    color: Colors.white,
    fontFamily: "sans",
    marginTop: 12,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
    padding: 20,
  },
  errorText: {
    color: Colors.white,
    fontFamily: "sans",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontFamily: "semibold",
    fontWeight: "semibold",
  },
  modalFooter: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    backgroundColor: "#000",
    borderTopWidth: 1,
    borderTopColor: Colors.placeholder,
  },
  footerCloseButton: {
    backgroundColor: Colors.placeholder,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  footerCloseButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: "semibold",
    fontWeight: "semibold",
  },
});
