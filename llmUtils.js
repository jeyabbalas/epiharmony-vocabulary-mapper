import {OpenAI} from 'https://cdn.skypack.dev/openai@4.52.0?min';


const manageOpenAIApiKey = {
    async validateOpenAIApiKey(baseURL, apiKey) {
        try {
            const openai = new OpenAI({
                baseURL: baseURL,
                apiKey: apiKey,
                dangerouslyAllowBrowser: true
            });
            await openai.models.list();
            return true;
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error('Invalid API key:', error);
                return false;
            } else {
                console.error('Error checking API key:', error);
                return false;
            }
        }
    },

    setKey(apiKey)  {
        localStorage.setItem('openai-api-key', apiKey);
    },

    getKey() {
        return localStorage.getItem('openai-api-key');
    },

    deleteKey() {
        localStorage.removeItem('openai-api-key');
    }
};


class LLM {
    constructor(openai, embedModelsList, chatModelsList, temperature, seed) {
        this.openai = openai;

        // Embedding model
        this.embedModelsList = embedModelsList;
        this.embedModel = null;
        this.embedModelDimensionRanges = {
            'text-embedding-ada-002': [1536, 1536],
            'text-embedding-3-small': [2, 1536],
            'text-embedding-3-large': [2, 3072]
        };
        this.embedModelDimensionDefaults = {
            'text-embedding-ada-002': 1536,
            'text-embedding-3-small': 1536,
            'text-embedding-3-large': 3072
        };
        this.dimension = this.embedModel ? this.embedModelDimensionDefaults[this.embedModel] : 0;

        // Chat model
        this.chatModelsList = chatModelsList;
        this.chatModel = null;
        this.temperature = temperature;
        this.seed = seed;
    }

    static async instantiate(baseURL, apiKey) {
        const openai = new OpenAI({
            baseURL: baseURL,
            apiKey: apiKey,
            dangerouslyAllowBrowser: true
        });

        const embedModelsList = (await openai.models.list()).data
            .map((d) => d.id)
            .filter((s) => s.includes("embedding"))
            .sort();
        const chatModelsList = (await openai.models.list()).data
            .map((d) => d.id)
            .filter((s) => !s.includes("embedding"))
            .sort();

        const temperature = 0.0;
        const seed = 1234;

        return new LLM(openai, embedModelsList, chatModelsList, temperature, seed);
    }

    async embed(texts) {
        const embedding = await this.openai.embeddings.create({
            model: this.embedModel,
            input: texts,
            dimensions: this.dimension,
            encoding_format: "float"
        });

        return embedding.data.map((d) => d.embedding);
    }

    getEmbedModelsList() {
        return this.embedModelsList;
    }

    getEmbedModel() {
        return this.embedModel;
    }

    setEmbedModel(embedModel) {
        this.embedModel = embedModel;
    }

    getEmbedModelDimensionRanges(modelName) {
        return this.embedModelDimensionRanges[modelName];
    }

    getEmbedModelDimensionDefaults(modelName) {
        return this.embedModelDimensionDefaults[modelName];
    }

    getDimension() {
        return this.dimension;
    }

    setDimension(dimension) {
        this.dimension = dimension;
    }

    getChatModelsList() {
        return this.chatModelsList;
    }

    getChatModel() {
        return this.chatModel;
    }

    setChatModel(chatModel) {
        this.chatModel = chatModel;
    }
}


export {
    manageOpenAIApiKey, LLM
};