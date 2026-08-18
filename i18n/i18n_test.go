package i18n

import (
	"testing"

	"github.com/stretchr/testify/require"
)

func TestLanguagePolicy(t *testing.T) {
	require.Equal(t, LangZhCN, DefaultLang)
	require.Equal(t, []string{LangZhCN, LangEn}, SupportedLanguages())
}

func TestNormalizeLanguage(t *testing.T) {
	testCases := []struct {
		name      string
		input     string
		expected  string
		supported bool
	}{
		{name: "simplified Chinese", input: "zh-CN", expected: LangZhCN, supported: true},
		{name: "legacy traditional Chinese", input: "zh-TW", expected: LangZhCN, supported: true},
		{name: "English variant", input: "en-US", expected: LangEn, supported: true},
		{name: "unsupported language", input: "fr-FR", expected: LangZhCN, supported: false},
	}

	for _, testCase := range testCases {
		t.Run(testCase.name, func(t *testing.T) {
			require.Equal(t, testCase.expected, NormalizeLanguage(testCase.input))
			require.Equal(t, testCase.supported, IsSupported(testCase.input))
		})
	}
}

func TestParseAcceptLanguage(t *testing.T) {
	require.Equal(t, LangEn, ParseAcceptLanguage("en-US,en;q=0.9"))
	require.Equal(t, LangZhCN, ParseAcceptLanguage("fr-FR,fr;q=0.9"))
}
