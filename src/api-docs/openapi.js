module.exports = {
  "openapi": "3.0.3",
  "info": {
    "title": "NYCompost API",
    "description": "NYCompost APIs that can be used to pull NYC cita data for available compost sites. City data based on [NYC Drop-Off Composting Sites](https://www.nyc.gov/assets/dsny/site/services/food-scraps-and-yard-waste-page/nyc-food-scrap-drop-off-locations)",
    "version": "1.0.0"
  },
  "externalDocs": {
    "description": "NYCompost Github",
    "url": "https://github.com/jasnoo/nycompost"
  },
  "servers": [
    {
      "url": "https://nycompost.onrender.com/api/v1"
    }
  ],
  "tags": [
    {
      "name": "sites",
      "description": "Info about available compost sites as well as user submitted compost sites",
      "externalDocs": {
        "description": "Official NYC sites",
        "url": "https://www.nyc.gov/assets/dsny/site/services/food-scraps-and-yard-waste-page/nyc-food-scrap-drop-off-locations"
      }
    }
  ],
  "paths": {
    "/sites/": {
      "get": {
        "tags": [
          "sites"
        ],
        "summary": "Show all compost sites",
        "description": "All compost sites will be shown (both user-submitted and non user-submitted)",
        "parameters": [
          {
            "name": "borough",
            "in": "query",
            "description": "Borough to filter by",
            "required": false,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "neighborhood",
            "in": "query",
            "description": "neighborhood to filter by",
            "required": false,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "org",
            "in": "query",
            "description": "Organization to filter by",
            "required": false,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "day_schedule",
            "in": "query",
            "description": "Schedule day to filter by (0 = Sunday, 1 = Monday, etc)",
            "required": false,
            "schema": {
              "type": "integer",
              "format": "int64",
              "minimum": 0,
              "maximum": 6
            }
          },
          {
            "name": "month_schedule",
            "in": "query",
            "description": "Month day to filter by (0 = January, 1 = February, etc)",
            "required": false,
            "schema": {
              "type": "integer",
              "format": "int64",
              "minimum": 0,
              "maximum": 11
            }
          },
          {
            "name": "accepts_meat",
            "in": "query",
            "description": "If site accepts meat, fish, dairy",
            "required": false,
            "schema": {
              "type": "boolean"
            }
          },
          {
            "name": "user_submitted",
            "in": "query",
            "description": "If site is a user_submitted site (true) or city submitted site (false)",
            "required": false,
            "schema": {
              "type": "boolean"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/SiteResponse"
                  }
                }
              }
            }
          },
          "400": {
            "description": "Invalid ID supplied"
          },
          "404": {
            "description": "Order not found"
          }
        }
      },
      "post": {
        "tags": [
          "sites"
        ],
        "summary": "Add a new user-submitted compost site",
        "description": "Add a new user-submitted compost site",
        "requestBody": {
          "description": "Add a new user-submitted compost site",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SiteRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "Successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SiteResponse"
                }
              }
            }
          },
          "405": {
            "description": "Invalid input"
          }
        }
      }
    },
    "/sites/{id}": {
      "get": {
        "tags": [
          "sites"
        ],
        "summary": "Show one compost site by ID",
        "description": "Show compost site data by ID (can be user-submitted or non user-submitted)",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "ID values of compost site to be fetched",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SiteResponse"
                }
              }
            }
          },
          "400": {
            "description": "Invalid ID supplied"
          },
          "404": {
            "description": "Order not found"
          }
        }
      },
      "put": {
        "tags": [
          "sites"
        ],
        "summary": "Update an existing user-submitted site of a specific ID",
        "description": "Update an existing user-submitted site (only sites with user_submitted = true can be updated)",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "ID values of compost site to filter for",
            "required": true,
            "explode": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "description": "Update existing user-submitted compost sites",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SiteRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "Successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SiteResponse"
                }
              }
            }
          },
          "400": {
            "description": "Invalid ID"
          },
          "404": {
            "description": "Site not found"
          },
          "405": {
            "description": "Validation exception"
          }
        }
      },
      "delete": {
        "tags": [
          "sites"
        ],
        "summary": "Deletes a user-submitted site",
        "description": "delete a site, can only be used when the {user_submitted = true}",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "ID values of compost site to be deleted",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Invalid site value"
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "SiteRequest": {
        "required": [
          "borough",
          "address"
        ],
        "type": "object",
        "properties": {
          "borough": {
            "type": "string",
            "enum": [
              "Bronx",
              "Brooklyn",
              "Queens",
              "Manhattan",
              "Staten Island"
            ],
            "example": "Queens"
          },
          "neighborhood": {
            "type": "string",
            "example": "South Jamaica"
          },
          "location": {
            "type": "string",
            "example": "Example Community Garden"
          },
          "address": {
            "type": "string",
            "example": "100 Community Garden Lane"
          },
          "org": {
            "type": "string",
            "example": "NYC Compost Org"
          },
          "day_schedule": {
            "type": "array",
            "items": {
              "type": "integer"
            },
            "example": [
              2,
              4
            ]
          },
          "month_schedule": {
            "type": "array",
            "example": [
              0,
              1,
              2,
              3,
              4
            ],
            "items": {
              "type": "integer"
            }
          },
          "schedule_notes": {
            "type": "string",
            "example": "From 10AM - 4PM"
          },
          "other_notes": {
            "type": "string",
            "example": "Drop off behind the gate"
          },
          "accepts_meat": {
            "type": "boolean",
            "example": false
          }
        }
      },
      "SiteResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "example": "64b6e389f5ea5c213351fec4"
          },
          "borough": {
            "type": "string",
            "enum": [
              "Bronx",
              "Brooklyn",
              "Queens",
              "Manhattan",
              "Staten Island"
            ],
            "example": "Queens"
          },
          "neighborhood": {
            "type": "string",
            "example": "South Jamaica"
          },
          "location": {
            "type": "string",
            "example": "Hopeful Community Garden"
          },
          "address": {
            "type": "string",
            "example": "100 Community Garden Lane, Queens NY, 20521"
          },
          "org": {
            "type": "string",
            "example": "NYC Compost Org"
          },
          "day_schedule": {
            "type": "array",
            "items": {
              "type": "integer"
            },
            "example": [
              2,
              4
            ]
          },
          "month_schedule": {
            "type": "array",
            "example": [
              0,
              1,
              2,
              3,
              4
            ],
            "items": {
              "type": "integer"
            }
          },
          "schedule_notes": {
            "type": "string",
            "example": "From 10AM - 4PM"
          },
          "other_notes": {
            "type": "string",
            "example": "Drop off behind the gate"
          },
          "accepts_meat": {
            "type": "boolean",
            "example": false
          },
          "user_submitted": {
            "type": "boolean",
            "example": true
          }
        }
      }
    }
  }
}